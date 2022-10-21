import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private static readonly MOBILE_MEDIA_QUERY_LISTENER_EVENT_TYPE = 'change';
  private static readonly MOBILE_MEDIA_QUERY = '(max-width: 576px)';
  private static readonly DEFAULT_LANG = 'en';

  isSidenavOpened = false;
  isMobile: boolean;
  isLangInit = false;
  readonly mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: (event: MediaQueryListEvent) => void;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly translate: TranslateService,
  ) {
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

  ngOnInit(): void {
    this.initLang();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener(AppComponent.MOBILE_MEDIA_QUERY_LISTENER_EVENT_TYPE, this.mobileQueryListener);
  }

  private initLang(): void {
    this.translate
      .use(AppComponent.DEFAULT_LANG)
      .pipe(first())
      .subscribe(() => {
        this.isLangInit = true;
      });
  }
}
