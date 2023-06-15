import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITovaryResponse } from 'src/app/shared/interfaces/tovary/tovary-interface';
import { OrderServiceService } from 'src/app/shared/order/order-service.service';
import { TovaryService } from 'src/app/shared/services/tovary/tovary.service';

@Component({
  selector: 'app-tovary',
  templateUrl: './tovary.component.html',
  styleUrls: ['./tovary.component.scss']
})
export class TovaryComponent {
  public userTovary: Array<ITovaryResponse> = [];
  private eventSubscription!: Subscription;
  constructor(
    private TovaryService: TovaryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderServiceService
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadTovary();
      }
    })
  }
  ngOnInit(): void {}
 
  loadTovary(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.TovaryService.getAllByCategory(categoryName).subscribe(data => {
      this.userTovary = data;
    })
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
}
tovaryCount(tovary: ITovaryResponse, value: boolean): void {
  if(value){
    ++tovary.count;
  } else if(!value && tovary.count > 1){
    --tovary.count;
  }
}

addToBasket(tovar: ITovaryResponse): void {
  let basket: Array<ITovaryResponse> = [];
  if(localStorage.length > 0 && localStorage.getItem('basket')){
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if(basket.some(prod => prod.id === tovar.id)){
      const index = basket.findIndex(prod => prod.id === tovar.id);
      basket[index].count += tovar.count;
    } else {
      basket.push(tovar);
    }
  } 
  localStorage.setItem('basket', JSON.stringify(basket));
  tovar .count = 1;
  this.orderService.changeBasket.next(true);
}
}
