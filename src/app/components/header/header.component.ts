import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constans/role-constans';
import { ITovaryResponse } from 'src/app/shared/interfaces/tovary/tovary-interface';
import { OrderServiceService } from 'src/app/shared/order/order-service.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from 'src/app/pages/basket-dialog/basket-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isActive = false;
  public isConteiner = false;
  public total = 0;
  private basket: Array<ITovaryResponse> = [];
  public loginUrl = '';
  constructor(
    private orderService: OrderServiceService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  showModel(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.isConteiner = true;
    } else {
      this.isConteiner = false;
    }
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
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
  openLoginDialog(): void {
    this.dialog
      .open(AuthDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(result);
      });
  }
  openBasketDialog(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'dialog-back-2',
      panelClass: 'auth-dialog-2',
      position: { right: '0px', top: '90px' },
    });
  }
}
