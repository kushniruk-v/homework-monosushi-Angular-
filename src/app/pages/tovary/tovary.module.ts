import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TovaryRoutingModule } from './tovary-routing.module';
import { SharedModule } from '../../shared/shared module';
import { TovaryComponent } from './tovary.component';
import { TovaryInfoComponent } from './tovary-info/tovary-info.component';



@NgModule({
  declarations: [
    TovaryComponent,
    TovaryInfoComponent
  ],
  imports: [
    CommonModule,
    TovaryRoutingModule,
    SharedModule
  ]
})
export class TovaryModule { }
