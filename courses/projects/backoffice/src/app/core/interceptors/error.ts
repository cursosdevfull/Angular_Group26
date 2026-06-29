import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Notifier } from '@backoffice/shared/services/notifier';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifierService = inject(Notifier);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 400) {
        const errorMessage =
          (error.error?.message ? JSON.parse(error.error.message).error : null) ||
          error.message ||
          'An unknown error occurred';

        notifierService.open(errorMessage);
      }

      return of(new HttpResponse({ status: error.status, body: { message: error.message } }));
    }),
  );
};

/*
HttpErrorResponse {headers: _HttpHeaders, status: 401, statusText: 'Unauthorized', url: 'http://localhost:3000/api/auth/login', ok: false, …}
error
: 
code
: 
401
message
: 
"{\"error\":\"Invalid credentials\"}"
status
: 
"ERROR"
[[Prototype]]
: 
Object
headers
: 
_HttpHeaders {headers: Map(2), normalizedNames: Map(2), lazyInit: undefined, lazyUpdate: null}
message
: 
"Http failure response for http://localhost:3000/api/auth/login: 401 Unauthorized"
name
: 
"HttpErrorResponse"
ok
: 
false
redirected
: 
false
responseType
: 
"cors"
status
: 
401
statusText
: 
"Unauthorized"
type
: 
undefined
url
: 
"http://localhost:3000/api/auth/login"
*/
