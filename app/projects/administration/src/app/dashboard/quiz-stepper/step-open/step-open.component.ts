import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, SubscriptionStatus } from '@domain/subscriptions/subscription';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-step-open',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './step-open.component.html',
  styleUrls: ['./step-open.component.sass'],
})
export class StepOpenComponent {
  @Input() subscriptions: Subscription[];
  @Input() quiz: Quiz;
  @Output() delete = new EventEmitter<Subscription>();

  public get subscriptionStatus(): typeof SubscriptionStatus {
    return SubscriptionStatus;
  }
}
