import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {

  public isActive= false;
 
  constructor(
    private router: Router
  ){

  }
  logOut():void{
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
  }
}
