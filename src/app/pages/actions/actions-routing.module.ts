import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { ActionInfoComponent } from './action-info/action-info.component';
import { ActionInfoResolver } from 'src/app/shared/services/action/action-info.resolver';




const routes: Routes = [
  {
    path: '', component: ActionsComponent
  },
  {
    path: ':id', component: ActionInfoComponent,
    resolve: {
      actionInfo:ActionInfoResolver
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ActionsRoutingModule {}
