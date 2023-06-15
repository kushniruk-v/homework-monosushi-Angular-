import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TovaryComponent } from './tovary.component';
import { TovaryInfoComponent } from './tovary-info/tovary-info.component';
import { TovaryService } from 'src/app/shared/services/tovary/tovary.service';




const routes: Routes = [
  // { path: '', component: TovaryComponent },
  { path: ':category', component: TovaryComponent },
  { path: ':id',component:TovaryInfoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TovaryRoutingModule {}
