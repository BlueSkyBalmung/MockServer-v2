import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {SpinnerService} from '../components/spinner/spinner.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Service d'interception de requête HTTP
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {
  }

  /**
   * Intercepte chaque requête HTTP afin d'afficher et de masquer le spinner lors d'un changement de page
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hideSpinner();
        }
      }, e => {
        this.spinnerService.hideSpinner();
      }));
  }

}
