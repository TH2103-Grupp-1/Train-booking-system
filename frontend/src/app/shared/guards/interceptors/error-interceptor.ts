import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Notyf } from 'notyf';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = 'Cannot reach server, check your internet connection';
                        console.log( `Error: ${error.error.message}`);
                    } else {
                        errorMsg = 'Cannot reach server, try again later';
                        console.log(`Error Code: ${error.status},  Message: ${error.message}`);
                    }
                    console.log(errorMsg);
                    return throwError(() => new Error(errorMsg));
                })
            )
    }
}
