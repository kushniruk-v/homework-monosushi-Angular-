import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TovaryService } from './tovary.service';
import { ITovaryResponse } from '../../interfaces/tovary/tovary-interface';

@Injectable({
  providedIn: 'root'
})

export class TovaryInfoResolver implements Resolve<ITovaryResponse> {
  constructor(private tovaryServise: TovaryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.tovaryServise.getOneFirebase(route.paramMap.get('id') as string);
  
  }
  }

