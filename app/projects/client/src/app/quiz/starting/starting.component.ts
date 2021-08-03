import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@client/login/user';
import { Quiz } from '@domain/quiz/quiz';
import { Subscription } from '@domain/subscriptions/subscription';

@Component({
  selector: 'app-starting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.sass'],
})
export class StartingComponent implements OnInit {
  @Input() user: User;
  @Input() quiz: Quiz;

  @Output() participate = new EventEmitter<Subscription>();

  constructor() {}

  ngOnInit(): void {}
}
