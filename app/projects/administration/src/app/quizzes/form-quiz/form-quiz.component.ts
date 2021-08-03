import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Quiz } from '@domain/quiz/quiz';
import { Round } from '@domain/round/round';

@Component({
  selector: 'app-form-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.sass'],
})
export class FormQuizComponent implements OnInit, OnChanges {
  @Input() quiz: Quiz;
  @Input() rounds: Round[];
  @Input() cancelRoute: string;
  @Output() save = new EventEmitter<{ quizId: number; quiz: Quiz }>();
  @Output() filter = new EventEmitter<string>();

  quizForm = this.fb.group({
    title: ['', Validators.required],
    date: [null, Validators.required],
    location: ['', Validators.required],
    maxSubscriptions: [10, Validators.required],
    remark: [''],
  });

  search = new FormControl();
  roundList = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).forEach((e) => this.filter.emit(e));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quiz && changes.quiz.currentValue) {
      this.quizForm.patchValue(this.quiz);
      this.roundList = [...this.quiz.rounds];
    }
    if (changes.rounds && changes.rounds.currentValue) {
      if (this.quiz) {
        this.rounds = this.rounds.filter((round) => this.roundList.findIndex((q) => q.roundId === round.roundId) < 0);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.roundList, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  select(round: Round): void {
    if (this.roundList.findIndex((r) => r.roundId === round.roundId) < 0) {
      this.roundList.push(round);
      this.filter.emit(this.search.value);
    }
  }

  deselect(round: Round): void {
    const index = this.roundList.findIndex((r) => r.roundId === round.roundId);
    this.roundList.splice(index, 1);
  }

  onSubmit(): void {
    this.save.emit({
      quizId: this.quiz ? this.quiz.quizId : null,
      quiz: {
        ...this.quiz,
        ...this.quizForm.value,
        rounds: this.roundList ?? [],
      },
    });
  }
}
