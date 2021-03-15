import { RoutingConstantesPath } from '../constantes/routing-path';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*
 * Permet de contrôler l'accès
 * à l'extranaute
 * afin de l'empêcher d'accèder à des pages non autorisées
 */
export class AuthorizedPathsService {
  authorizedPaths: Set<string>;

  constructor() {
    this.resetListAuthorizedPath();
  }

  /**
   * Permet d'ajouter un path
   * @param path
   */
  public addPath( path: string ): void {
    this.authorizedPaths.add(path);
  }

  /**
   * Permet de supprimer un path
   * @param path
   */
  public removePath( path: string ): void {
    this.authorizedPaths.delete(path);
  }

  /**
   * Permet de savoir si il y a un path
   * @param path
   */
  public hasPath( path: string ): boolean {
    return this.authorizedPaths.has(path);
  }

  /**
   * Permet de savoir si c'est une page authorisée ou non
   * @param url
   */
  public isAuthorizedURL(url: string): boolean {
    const relative = url.replace('/', '');
    return this.hasPath(relative);
  }

  /**
   * Permet de remettre à zero la liste des pages authorisées
   */
  public resetListAuthorizedPath(): void {
    this.authorizedPaths = new Set<string>();
    this.addPath( RoutingConstantesPath.AUTHENTICATION_PROJECT );
  }
}
