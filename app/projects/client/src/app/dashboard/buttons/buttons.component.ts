import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { query, QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { User } from '@client/login/user';
import { Subscription } from '@domain/subscriptions/subscription';
import { SubscriptionService } from '@domain/subscriptions/subscription.service';

@Component({
  selector: 'app-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.sass'],
})
export class ButtonsComponent implements OnInit {
  @Input() user: User;

  subscription$: Observable<QueryOutput<Subscription>>;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.subscription$ = query('subscriptions-active', this.user, (user) => this.subscriptionService.getActive(user.email));
  }
}
