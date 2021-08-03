import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connection: signalR.HubConnection;

  constructor(private env: EnvService) {}

  addWatch(methodName: string, newMethod: (...args: any[]) => void): void {
    console.log('Start listening to events', methodName);
    this.connection.on(methodName, newMethod);
  }

  subscribe(quizId: number): void {
    console.log('subscribeToQuiz', quizId, this.connection);
    this.connection.invoke('subscribeToQuiz', quizId);
  }

  unsubscribe(quizId: number): void {
    console.log('unsubscribeFromQuiz', quizId, this.connection);
    this.connection.invoke('unsubscribeFromQuiz', quizId);
  }

  connect(): Promise<void> {
    console.log('Connect to signalr service');
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder().withUrl(`${this.env.api}quizmeister/`).build();
      return this.connection.start().catch((err) => console.error(err));
    }
  }

  disconnect(): void {
    console.log('Disconnect from signalr service');
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
}
