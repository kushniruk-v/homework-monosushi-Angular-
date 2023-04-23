import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';


import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutComponent } from './pages/about/about.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminComponent } from './admin/admin.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AdminTovaryComponent } from './admin/admin-tovary/admin-tovary.component';
import { TovaryComponent } from './pages/tovary/tovary.component';
import { TovaryInfoComponent } from './pages/tovary-info/tovary-info.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DostavkaTaOplataComponent,
    AboutComponent,
 
    ActionsComponent,
       AdminCategoryComponent,
       AdminActionComponent,
       AdminComponent,
       AdminTovaryComponent,
       TovaryComponent,
       TovaryInfoComponent,
       ActionInfoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
