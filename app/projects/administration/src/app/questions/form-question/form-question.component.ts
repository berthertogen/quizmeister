import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Question, QuestionTypes } from '@domain/question/question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.sass'],
})
export class FormQuestionComponent implements OnChanges {
  @Input() question: Question;
  @Input() cancelRoute: string;
  @Output() save = new EventEmitter<{ questionId: number; question: Question }>();

  typeValues: Observable<QuestionTypes>;
  options: { allowMultiple: boolean } = { allowMultiple: false };
  questionForm = this.fb.group({
    title: ['', Validators.required],
    type: [null, Validators.required],
    remark: [''],
    answers: [null],
    scoring: this.fb.group({
      type: [null],
      weightCorrectAnswer: [null],
      weightNoAnswer: [null],
      timeLimitSeconds: [null],
      timeScoringInterval: [null],
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question && changes.question.currentValue) {
      this.questionForm.patchValue(this.question);
    }
    this.type.valueChanges.forEach((v: number) => {
      this.options = { allowMultiple: this.isMultipleChoise(v) };
    });
    this.options = { allowMultiple: this.isMultipleChoise(this.question.type) };
  }

  onSubmit(): void {
    this.save.emit({
      questionId: this.question ? this.question.questionId : null,
      question: {
        ...this.question,
        ...this.questionForm.value,
      },
    });
  }

  get type(): AbstractControl {
    return this.questionForm.controls.type;
  }

  get scoringType(): AbstractControl {
    return (this.questionForm.controls.scoring as FormGroup).controls.type;
  }

  isMultipleChoise(questionType: number): boolean {
    return questionType === QuestionTypes.multipleChoise;
  }
}
