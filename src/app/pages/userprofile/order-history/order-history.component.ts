import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
public userOrder=[
  {
    id:"1",
    data:"12.07.2023 18:23:20",
    adress:"вул.Зелена,109",

    products:[
      {
        id:"20",
        tovarname:"Запечений сет",
        count:"1"
      },
      {
        id:"10",
        tovarname:"Пепсі",
        count:"2"
      }
     
    ],
    suma:"950 грн",
    status:" Виконано"
  }
  

]
}
