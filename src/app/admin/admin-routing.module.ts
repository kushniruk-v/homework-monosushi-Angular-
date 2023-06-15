import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminActionComponent } from './admin-action/admin-action.component';
import { AdminTovaryComponent } from './admin-tovary/admin-tovary.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent, children:[
      { path: 'category', component: AdminCategoryComponent },
      { path: 'action', component: AdminActionComponent },
      { path: 'tovary', component: AdminTovaryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
