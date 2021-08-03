import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  production: boolean;
  instrumentationKey: string;
  enableApplicationInsights: boolean;
  api: string;

  constructor() {
    const browserWindow = window || ({} as any);
    const browserWindowEnv = browserWindow.env || {};

    for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
        this[key] = (window as any).env[key];
      }
    }
  }
}
