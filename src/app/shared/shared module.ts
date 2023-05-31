import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

const MATIRIAL =[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule

]
@NgModule({
    declarations:[],
    imports:[
        ...MATIRIAL
    ],
    exports:[
        ...MATIRIAL
    ]
})
export class SharedModule{ }