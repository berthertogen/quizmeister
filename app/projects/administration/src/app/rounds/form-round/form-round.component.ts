import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Question } from '@domain/question/question';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Round } from '@domain/round/round';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-round',
  templateUrl: './form-round.component.html',
  styleUrls: ['./form-round.component.sass'],
})
export class FormRoundComponent implements OnChanges, OnInit {
  @Input() round: Round;
  @Input() questions: Question[];
  @Input() themes: string[];
  @Input() cancelRoute: string;
  @Output() save = new EventEmitter<{ roundId: number; round: Round }>();
  @Output() filter = new EventEmitter<string>();

  roundForm = this.fb.group({
    title: ['', Validators.required],
    theme: [''],
    remark: [''],
  });

  search = new FormControl();
  questionList = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).forEach((e) => this.filter.emit(e));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.round && changes.round.currentValue) {
      this.roundForm.patchValue(this.round);
      this.questionList = [...this.round.questions];
    }
    if (changes.questions && changes.questions.currentValue) {
      if (this.round) {
        this.questions = this.questions.filter((question) => this.questionList.findIndex((q) => q.questionId === question.questionId) < 0);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  select(question: Question): void {
    if (this.questionList.findIndex((q) => q.questionId === question.questionId) < 0) {
      this.questionList.push(question);
      this.filter.emit(this.search.value);
    }
  }

  deselect(question: Question): void {
    const index = this.questionList.findIndex((q) => q.questionId === question.questionId);
    this.questionList.splice(index, 1);
  }

  onSubmit(): void {
    this.save.emit({
      roundId: this.round ? this.round.roundId : null,
      round: {
        ...this.roundForm.value,
        questions: this.questionList ?? [],
      },
    });
  }
}
