import { Component,OnDestroy,OnInit  } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ROLE } from 'src/app/shared/constans/role-constans';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
public authForm!:FormGroup;
public loginSubsrition!:Subscription;
constructor(
  private fb:FormBuilder,
  private accountService :AccountService,
  private router: Router,
  private auth:Auth,
  private AngularFireStorage:Firestore
){
  
}
  ngOnDestroy(): void {
this.loginSubsrition.unsubscribe();
  }
ngOnInit(): void {
this.initAuthForm();
}
initAuthForm():void{
this.authForm=this.fb.group({
  email:[null,[Validators.required, Validators.email]],
  password: [null, [Validators.required]]
})
}

loginUser():void{
const {email,password} =this.authForm.value;
this.login(email,password).then(()=>{
  // console.log('login done');
}).catch(e=>{
  // console.log('login error',e); 
})
}
async login(email: string, password: string): Promise<void> {
const credential =await signInWithEmailAndPassword(this.auth,email,password)
console.log(credential.user.uid);
 this.loginSubsrition = docData(doc(this.AngularFireStorage,'users',credential.user.uid)).subscribe(user=>{
   const currentUser = {...user, uid:credential.user.uid};
 localStorage.setItem('currentUser', JSON.stringify(currentUser))
   if(user && user['role'] === ROLE.ADMIN){
      this.router.navigate(['/admin']);
    }
}, (e)=>{
  console.log('error',e);
  
})
}

}
