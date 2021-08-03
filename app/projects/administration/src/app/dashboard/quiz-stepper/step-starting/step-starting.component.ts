import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Subscription, SubscriptionStatus } from '@domain/subscriptions/subscription';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-step-starting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './step-starting.component.html',
  styleUrls: ['./step-starting.component.sass'],
})
export class StepStartingComponent {
  @Input() subscriptions: Subscription[];
  @Input() quiz: Quiz;
  @Output() delete = new EventEmitter<Subscription>();
  @Output() new = new EventEmitter<Subscription>();

  public get subscriptionStatus(): typeof SubscriptionStatus {
    return SubscriptionStatus;
  }
}
