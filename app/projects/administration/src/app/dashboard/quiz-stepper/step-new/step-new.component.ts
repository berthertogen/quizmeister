import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-step-new',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './step-new.component.html',
  styleUrls: ['./step-new.component.sass'],
})
export class StepNewComponent {
  @Input() quiz: Quiz;

  displayRounds(quiz: Quiz): string {
    return quiz.rounds.map((r) => r.title).join(', ');
  }
}
