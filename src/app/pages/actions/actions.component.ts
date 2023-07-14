import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IActionResponse } from 'src/app/shared/interfaces/action/action-interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  userActions: Array<IActionResponse> = [];
  private eventSubscription!: Subscription;
  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadAction();
      }
    });
  }
  ngOnInit(): void {}

  loadAction(): void {
    this.actionService.getAllFirebase().subscribe((data) => {
      this.userActions = data as IActionResponse[];
    });
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
