import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action-interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {
  public currentAction!: IActionResponse;
  constructor(
    private actionServis: ActionService,
    private activatedRoute: ActivatedRoute,
    
   
  ) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response=>{
      this.currentAction=response['actionInfo'];
    })

}



}
