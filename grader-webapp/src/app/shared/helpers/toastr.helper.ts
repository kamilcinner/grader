import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ToastrHelper {
  constructor(private readonly toastr: ToastrService, private readonly translate: TranslateService) {}

  success(messageTranslation: string): void {
    this.toastr.success(this.translate.instant(messageTranslation));
  }

  error(messageTranslation: string): void {
    this.toastr.error(this.translate.instant(messageTranslation));
  }

  warning(messageTranslation: string): void {
    this.toastr.warning(this.translate.instant(messageTranslation));
  }

  info(messageTranslation: string): void {
    this.toastr.info(this.translate.instant(messageTranslation));
  }
}
