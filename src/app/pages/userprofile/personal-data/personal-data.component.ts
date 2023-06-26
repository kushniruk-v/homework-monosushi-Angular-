import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {
public infoPersonForm!:FormGroup

  constructor(
    private fb: FormBuilder,

  ) {}
  ngOnInit(): void {
    this.infoPerson();

  }
  infoPerson(): void {
    this.infoPersonForm = this.fb.group({
      firstname: [null],
      lastname :[null],
      phoneNumber:[null],
      email:[null]
    });
  }
}

