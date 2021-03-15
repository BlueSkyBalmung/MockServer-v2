import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../../environments/environment';
import {RequestReturn} from '../models/request-return';
import {SessionStorage} from 'ngx-webstorage';

const LOGIN_API = 'auth/login';
const INIT_API = 'auth/signup';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Login de l'utilisateur
   */
  @SessionStorage('loginValue')
  login: string;
  /**
   * Password de l'utilisateur
   */
  @SessionStorage()
  password: string;

  @SessionStorage('authenticateValue')
  authenticate = false;

  /**
   * constructeur
   * @param http client
   */
  constructor(private http: HttpClient) { }
  /**
   * Service de connection
   * @param login de l'utilisateur
   * @param password de l'utilisateur
   */
  public callLoginService(login: string, password: string): Observable<RequestReturn> {
    const reqResponse = new Subject<RequestReturn>();
    const user = new User();
    user.login = login;
    user.password = password;
    this.http.post<RequestReturn>(environment.api + LOGIN_API, user).subscribe(req => {
      if (req.isSuccess) {
        this.login = login;
        this.password = password;
        this.authenticate = true;
      }
      reqResponse.next(req);
    }, error => {
      const requestError = new RequestReturn();
      requestError.isSuccess = false;
      requestError.message = error.error.message;
      reqResponse.next(requestError);
    });
    return reqResponse;
  }
  /**
   * Service rest appelant l'api de l'init du repo
   * @param login de l'utilisateur
   * @param password de l'utilisateur
   */
  public callInitService(login: string, password: string): Observable<RequestReturn> {
    const reqResponse = new Subject<RequestReturn>();
    const user = new User();
    user.login = login;
    user.password = password;
    this.http.post<RequestReturn>(environment.api + INIT_API, user).subscribe(req => {
      this.login = login;
      this.password = password;
      this.authenticate = true;
      reqResponse.next(req);
    }, error => {
      const requestError = new RequestReturn();
      requestError.isSuccess = false;
      requestError.message = error.error.message;
      reqResponse.next(requestError);
    });
    return reqResponse;
  }
}
