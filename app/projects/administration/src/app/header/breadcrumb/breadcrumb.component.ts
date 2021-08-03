import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass'],
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumb: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.breadcrumb = this.findRoot();
      });
  }

  private findRoot(): string {
    if (
      this.activatedRoute.snapshot &&
      this.activatedRoute.snapshot.root &&
      this.activatedRoute.snapshot.root.firstChild &&
      this.activatedRoute.snapshot.root.firstChild.url &&
      this.activatedRoute.snapshot.root.firstChild.url[0]
    ) {
      const path = this.activatedRoute.snapshot.root.firstChild.url[0].path;
      const config = this.router.config.find((r) => r.path === path);
      return config && config.data && config.data.displayName ? config.data.displayName : null;
    }
    return null;
  }
}
