import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslateHelper {
  constructor(readonly translate: TranslateService) {}

  getRawOrTranslatedOrEmpty(raw?: string, translation?: string): string {
    if (raw) {
      return raw;
    }

    if (translation) {
      return this.translate.instant(translation);
    }

    return '';
  }
}
