import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorage} from "../sessionStorage/token-storage";
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private token: TokenStorage) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.token.getToken() != null) {
      console.log("token is not null");
      console.log(this.token.getToken());
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            //this.nav.setRoot(LoginPage);
            console.log("Ga naar LoginPage");
          }
        }
      }
    );
  }
}
