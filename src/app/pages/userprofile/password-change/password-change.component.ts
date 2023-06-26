import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  public changePasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,

  ) {}
  ngOnInit(): void {
   this.changePassword()

  }
  changePassword(): void {
    this.changePasswordForm = this.fb.group({
      password: [null],
      newpassword:[null],
      repeatpassword:[null],
    });
  }
}
