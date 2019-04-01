import { Injectable, Injector } from "@angular/core";
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from
    "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";

// auth interceptor - allow tokens to persist across HTTP requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        var auth = this.injector.get(AuthService);
        if (auth.isLoggedIn())
            console.log("intercept() : User logged in ...");
        var token = (auth.isLoggedIn()) ? auth.getAuth()!.token : null;
        if (auth.getAuth())
            console.log("intercept() : Last token is " + auth.getAuth()!.token + "...");
        console.log("intercept() : Calling ...");
        if (token) {
            console.log("intercept() : JSON Token is " + token);
            console.log("intercept() : Injecting JSON token to HTTP request.");
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
