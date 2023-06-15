import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileRoutingModule } from './userprofile-routing.module';
import { SharedModule } from '../../shared/shared module';
import { UserprofileComponent } from './userprofile.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    UserprofileComponent,
    PersonalDataComponent,
    OrderHistoryComponent,
    PasswordChangeComponent

  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    SharedModule
  ]
})
export class UserprofileModule { }
