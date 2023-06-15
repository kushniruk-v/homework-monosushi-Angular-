import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITovaryResponse } from 'src/app/shared/interfaces/tovary/tovary-interface';
import { OrderServiceService } from 'src/app/shared/order/order-service.service';
import { TovaryService } from 'src/app/shared/services/tovary/tovary.service';
@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss'],
})
export class BasketDialogComponent {
  public total = 0;

  public userTovary: Array<ITovaryResponse> = [];

  constructor(
    private orderService: OrderServiceService,
    private router: Router,
    public dialog: MatDialog,

    private TovaryService: TovaryService
  ) {}
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.userTovary = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
  getTotalPrice(): void {
    this.total = this.userTovary.reduce(
      (total: number, tovar: ITovaryResponse) =>
        total + tovar.count * tovar.price,
      0
    );
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  goHomePage(): void {
    this.router.navigate(['/']);
    this.dialog.closeAll();
  }

  tovaryCount(tovary: ITovaryResponse, value: boolean): void {
    if (value) {
      ++tovary.count;
      localStorage.setItem('basket', JSON.stringify(this.userTovary));
    } else if (!value && tovary.count > 1) {
      --tovary.count;
      localStorage.setItem('basket', JSON.stringify(this.userTovary));
    }

    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  deleteTovar(tovary: ITovaryResponse): void {
    if (this.userTovary.some((tovar) => tovar.id === tovar.id)) {
      const index = this.userTovary.findIndex((tovar) => tovar.id === tovar.id);
      this.userTovary.splice(index, 1);

      localStorage.setItem('basket', JSON.stringify(this.userTovary));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }
}
