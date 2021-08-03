import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationInsightsService implements OnDestroy {
  private routerSubscription: Subscription;

  private appInsights: ApplicationInsights;

  constructor(private router: Router, private env: EnvService) {}

  init(): void {
    if (this.env.enableApplicationInsights) {
      console.log('Enable app insights');
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: this.env.instrumentationKey,
          enableAutoRouteTracking: true,
        },
      });
      this.appInsights.loadAppInsights();
      this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          console.log('Log view for ', activatedComponent.name);
          this.logPageView(`${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  logPageView(name?: string, uri?: string): void {
    if (this.env.enableApplicationInsights) {
      this.appInsights.trackPageView({ name, uri });
    }
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
