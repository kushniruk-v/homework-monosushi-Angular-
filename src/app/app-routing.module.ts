import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutComponent } from './pages/about/about.component';


import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminTovaryComponent } from './admin/admin-tovary/admin-tovary.component';
import { TovaryComponent } from './pages/tovary/tovary.component';
import { TovaryInfoComponent } from './pages/tovary-info/tovary-info.component';
import { TovaryService } from './shared/services/tovary/tovary.service';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { ActionService } from './shared/services/action/action.service';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'actions',component:ActionsComponent},
  {path:'action/:id',component:ActionInfoComponent,
resolve:{
  actionInfo:ActionService
}},
  {path:'product-category/:category',component:TovaryComponent},
  { path: 'product-category/:category/:id', component: TovaryInfoComponent, 
  resolve:{
    tovaryInfo:TovaryService
  }},
  {path:'dostavka-ta-oplata',component:DostavkaTaOplataComponent},
  {path:'about-us',component:AboutComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'category', component: AdminCategoryComponent },
    { path: 'action', component:AdminActionComponent },
    {path:'tovary',component: AdminTovaryComponent},
    
    { path: '', pathMatch: 'full', redirectTo: 'action' }
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
