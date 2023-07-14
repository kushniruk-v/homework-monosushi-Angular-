import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionService } from './action.service';
import { ITovaryResponse } from '../../interfaces/tovary/tovary-interface';
import { IActionResponse } from '../../interfaces/action/action-interface';

@Injectable({
  providedIn: 'root'
})

export class ActionInfoResolver implements Resolve<IActionResponse> {
  constructor(private ActionServise: ActionService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.ActionServise.getOneFirebase(route.paramMap.get('id') as string);
  
  }
}
