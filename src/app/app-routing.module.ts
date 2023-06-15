import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './shared/guards/auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'actions',

    loadChildren:()=>import('./pages/actions/actions.module').
    then(m=> m.ActionsModule)
  },

  {
   path: 'product-category',

    loadChildren:()=> import('./pages/tovary/tovary.module').
    then(m=> m.TovaryModule)
  },



  {path:'dostavka-ta-oplata', loadChildren:()=>import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').
    then(m=> m.DostavkaTaOplataModule)
  },

  {path:'about-us', loadChildren:()=> import('./pages/about/about.module').
    then(m=> m.AboutModule)},

  {path:'auth', loadChildren:()=> import('./pages/authorization/authorization.module').
    then(m=> m.AuthorizationModule)
  },

  {
    path:'user-profile',
    canActivate: [AuthGuard],
    loadChildren:()=>import('./pages/userprofile/userprofile.module').then(m=>m.UserprofileModule)
  },
  {
    path:'admin',
    canActivate: [AuthGuard],
    loadChildren:()=> import('./admin/admin.module').then(m => m.AdminModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
