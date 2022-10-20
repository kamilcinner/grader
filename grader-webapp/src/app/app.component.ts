import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private static readonly MOBILE_MEDIA_QUERY_LISTENER_EVENT_TYPE = 'change';
  private static readonly MOBILE_MEDIA_QUERY = '(max-width: 600px)';

  isSidenavOpened = false;
  isMobile: boolean;
  readonly mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: (event: MediaQueryListEvent) => void;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly media: MediaMatcher) {
    this.mobileQuery = media.matchMedia(AppComponent.MOBILE_MEDIA_QUERY);
    this.isMobile = this.mobileQuery.matches;
    this.isSidenavOpened = !this.isMobile;
    this.mobileQueryListener = (event) => {
      this.isMobile = event.matches;
      this.isSidenavOpened = !this.isMobile;
      cdr.detectChanges();
    };
    this.mobileQuery.addEventListener(AppComponent.MOBILE_MEDIA_QUERY_LISTENER_EVENT_TYPE, this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener(AppComponent.MOBILE_MEDIA_QUERY_LISTENER_EVENT_TYPE, this.mobileQueryListener);
  }
}
