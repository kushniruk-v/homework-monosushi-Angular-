import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constans/role-constans';
import { AccountService } from 'src/app/shared/services/account/account.service';

export interface Iregister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  returnpassword?: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isModal = false;
  private registerData!: Iregister;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: Auth,
    private AngularFireStorage: Firestore,
    private router: Router,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.initAuthForm();
    this.InitRegisterForm();
  }
  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  InitRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      returnpassword: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    this.isModal = false;

    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        // console.log('login done');
      })
      .catch((e) => {
        // console.log('login error',e);
      });
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    console.log(credential.user.uid);
    docData(
      doc(this.AngularFireStorage, 'users', credential.user.uid)
    ).subscribe(
      (user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (user && user['role'] === ROLE.USER) {
          this.router.navigate(['/user-profile']);
        }
      },
      (e) => {
        console.log('error', e);
      }
    );
  }

  registerUser(): void {
    this.isModal = true;
    const { email, password } = this.registerForm.value;
    this.registerData = this.registerForm.value;

    this.emailSingUp(email, password)
      .then(() => {
        this.registerForm.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async emailSingUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
      orders: [],
      role: 'USER',
    };

    setDoc(doc(this.AngularFireStorage, 'users', credential.user.uid), user);
  }
}
