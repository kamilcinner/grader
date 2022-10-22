import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConflictResponseModel } from '@shared/models';

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {
  constructor(private readonly toastr: ToastrService, private readonly ngZone: NgZone) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        const conflictResponse: ConflictResponseModel = response.error;
        this.ngZone.run(() => this.toastr.error(conflictResponse.errorMessage));

        return throwError(() => new Error(response.message));
      }),
    );
  }
}
