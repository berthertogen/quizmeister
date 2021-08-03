import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '@domain/question/question.service';
import { Question } from '@domain/question/question';

@Component({
  selector: 'app-edit-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.sass'],
})
export class EditQuestionComponent implements OnInit {
  question: Observable<Question>;

  constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.question = this.activatedRoute.snapshot.data.question;
  }

  save(input: { questionId: number; question: Question }): void {
    this.questionService
      .update(input.questionId, input.question)
      .forEach(() => this.router.navigate(['../../list'], { relativeTo: this.activatedRoute }));
  }
}
