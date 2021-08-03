import { displayQuestionTypes, displayScoringTypes, Question, QuestionTypes, ScoringTypes } from '@domain/question/question';
import { NextQuizRunStepEvent } from '@domain/quiz-run-steps/quiz-run-step';
import { TimerStepEvent } from '@domain/quiz-run-steps/timer/timer-step';
import { Quiz } from '@domain/quiz/quiz';
import { Round } from '@domain/round/round';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AnswerStepEvent } from '@domain/quiz-run-steps/answer/answer-step';

@Component({
  selector: 'app-question-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.sass'],
})
export class QuestionSliderComponent implements OnChanges {
  @Input() quiz: Quiz;
  @Input() rounds: Round[];
  @Input() currentStepEvent: NextQuizRunStepEvent;
  @Input() timerStep: TimerStepEvent;

  @Output() next = new EventEmitter<void>();

  questionCount: number;
  currentQuestionIndex: number;
  question: Question;
  nextQuestion: Question;
  previousQuestion: Question;
  answeredCount = 0;
  answeredPercentage = 0;
  previousAnsweredCount = 0;
  previousAnsweredPercentage = 0;

  constructor() {}

  ngOnChanges(_: SimpleChanges): void {
    this.question = this.currentStepEvent.step.question;
    const currentRound = this.rounds.find((r) => r.roundId === this.currentStepEvent.step.round.roundId);
    this.questionCount = currentRound.questions.length;
    this.currentQuestionIndex = currentRound.questions.findIndex((q) => q.questionId === this.currentStepEvent.step.question.questionId);
    if (this.currentQuestionIndex < currentRound.questions.length) {
      this.nextQuestion = currentRound.questions[this.currentQuestionIndex + 1];
    }
    if (this.currentQuestionIndex >= 1) {
      this.previousQuestion = this.currentStepEvent.previousStep ? this.currentStepEvent.previousStep.question : null;
      this.previousAnsweredCount =
        this.currentStepEvent.previousStep && this.currentStepEvent.previousStep.answeredBy
          ? this.currentStepEvent.previousStep.answeredBy.length
          : 0;
      this.previousAnsweredPercentage =
        this.currentStepEvent.previousStep && this.currentStepEvent.previousStep.answeredBy
          ? (this.currentStepEvent.previousStep.answeredBy.length / this.quiz.subscriptions.length) * 100
          : 0;
    }
    this.answeredCount = this.currentStepEvent.step.answeredBy ? this.currentStepEvent.step.answeredBy.length : 0;
    this.answeredPercentage = this.currentStepEvent.step.answeredBy
      ? (this.currentStepEvent.step.answeredBy.length / this.quiz.subscriptions.length) * 100
      : 0;
  }

  displayScoringTypes(type: ScoringTypes): string {
    return displayScoringTypes(type);
  }

  displayQuestionTypes(type: QuestionTypes): string {
    return displayQuestionTypes(type);
  }

  displayQuestionTitle(): string {
    return `${this.question ? this.question.title : ''} (${this.currentQuestionIndex + 1}/${this.questionCount})`;
  }

  public get questionTypes(): typeof QuestionTypes {
    return QuestionTypes;
  }

  public get scoringTypes(): typeof ScoringTypes {
    return ScoringTypes;
  }
}
