import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

type HttpOptions = {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] };
};

enum HttpObserveType {
  BODY = 'body',
  EVENTS = 'events',
  RESPONSE = 'response',
}

enum HttpResponseType {
  JSON = 'json',
  ARRAY_BUFFER = 'arraybuffer',
  BLOB = 'blob',
  TEXT = 'text',
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected readonly http: HttpClient) {}

  protected get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}${url}`, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected post<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected patch<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(`${environment.API_URL}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected put<T>(url: string, body: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}${url}`, body, {
      ...options,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }

  protected delete<T>(url: string, body?: Record<string, unknown>, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${environment.API_URL}${url}`, {
      ...options,
      body,
      observe: HttpObserveType.BODY,
      responseType: HttpResponseType.JSON,
    });
  }
}
