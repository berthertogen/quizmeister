import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionDefault, Question } from '@domain/question/question';
import { QuestionService } from '@domain/question/question.service';

@Component({
  selector: 'app-add-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.sass'],
})
export class AddQuestionComponent {
  question = new QuestionDefault();

  constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) {}

  save(input: { questionId: number; question: Question }): void {
    this.questionService.create(input.question).forEach(() => this.router.navigate(['../list'], { relativeTo: this.activatedRoute }));
  }
}
