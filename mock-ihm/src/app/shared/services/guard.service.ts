import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router, CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizedPathsService } from './authorized-paths.service';
import {RoutingConstantesPath} from '../constantes/routing-path';
import {UserService} from './user.service';
import {SessionStorageService} from 'ngx-webstorage';

/**
 * Classe qui sécurise les accès au SEL
 */
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivateChild {
  /**
   *  Constructeur vide par défaut
   * @param router
   * @param authorizedPaths
   * @param userService
   * @param storage
   */
  constructor( private router: Router, private authorizedPaths: AuthorizedPathsService, private userService: UserService,
               private storage: SessionStorageService) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authorizedPaths.isAuthorizedURL(state.url)) {
      /**
       * Page par défaut : l'accueil
       */
      if (state.url.replace('/', '') === RoutingConstantesPath.AUTHENTICATION_PROJECT) {
        console.log('here');
        return false;
      } else {
        console.log('here1');
        this.router.navigate([RoutingConstantesPath.AUTHENTICATION_PROJECT]);
        return true;
      }
    } else {
      if (this.storage.retrieve('authenticateValue')) {
        this.userService.authenticate = this.storage.retrieve('authenticateValue');
        this.userService.login = this.storage.retrieve('loginValue');
        console.log('retrieve');
      }
      if (!this.userService.authenticate &&
        state.url.replace('/', '') !== RoutingConstantesPath.AUTHENTICATION_PROJECT) {
        console.log('unlog');
        this.router.navigate([RoutingConstantesPath.AUTHENTICATION_PROJECT]);
      }
      console.log('here2');
      return true; }
  }
}
