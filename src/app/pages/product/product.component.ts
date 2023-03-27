import { Component } from '@angular/core';
import { ITovaryResponse } from 'src/app/shared/interfaces/tovary/tovary-interface';
import { TovaryService } from 'src/app/shared/services/tovary/tovary.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public userTovary: Array<ITovaryResponse> = [];
  constructor(
    private TovaryService: TovaryService
  ) { }
  ngOnInit(): void {
    this.getTovary();
  }
  getTovary(): void {
  
    this.TovaryService. getAll().subscribe(data => {
      this.userTovary = data;
      
    })
  }

}
