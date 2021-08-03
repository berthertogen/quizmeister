import { Component, forwardRef, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Answer, AnswerDefault } from '@domain/question/question';

@Component({
  selector: 'app-answer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: (c: FormControl) => {
        const err = {
          correctAnswer: {
            given: c.value,
          },
        };
        return c.value && c.value && c.value.findIndex((v) => v.correct) >= 0 && c.value.findIndex((v) => !v.text) < 0 ? null : err;
      },
      multi: true,
    },
  ],
})
export class AnswerComponent implements ControlValueAccessor, OnChanges {
  @Input() options: { allowMultiple: boolean } = { allowMultiple: false };
  originalAnswers: Answer[] = [];

  answerForm: FormGroup;

  constructor() {}

  propagateChange = (_: any) => {};

  ngOnChanges(): void {
    this.build(this.originalAnswers);
  }

  writeValue(answers: Answer[]): void {
    this.originalAnswers = answers;
    this.build(this.originalAnswers);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void {}
  setDisabledState?(): void {}

  build(answers: Answer[]): void {
    this.answerForm = new FormGroup({});
    if (answers && answers.length > 0) {
      if (this.options.allowMultiple) {
        answers = answers;
      } else {
        answers = [answers[0]];
      }
    } else {
      answers = [new AnswerDefault()];
    }
    const formArray = new FormArray(
      answers.map(
        (a) =>
          new FormGroup({
            answerId: new FormControl(a.answerId),
            text: new FormControl(a.text),
            correct: new FormControl(a.correct),
          }),
      ),
    );
    this.answerForm.addControl('answers', formArray);
    this.answerForm.patchValue({ answers }, { emitEvent: false });
    formArray.valueChanges.forEach(() => {
      this.changed();
    });
    this.changed();
  }
  changed(): void {
    this.propagateChange(
      this.answers.controls.map((c) => ({
        answerId: c.value.answerId,
        text: c.value.text,
        correct: c.value.correct,
      })),
    );
  }
  add(): void {
    this.answers.push(
      new FormGroup({
        answerId: new FormControl(),
        text: new FormControl(),
        correct: new FormControl(false),
      }),
    );
    this.changed();
  }
  delete(index: number): void {
    this.answers.controls.splice(index, 1);
    this.changed();
  }

  get answers(): FormArray {
    return this.answerForm.controls.answers as FormArray;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.answers.controls, event.previousIndex, event.currentIndex);
    this.changed();
  }
}
