import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { RoutingConstantesPath } from '../shared/constantes/routing-path';

@Component({
  selector: 'app-upload-file-envoye',
  templateUrl: './upload-file-envoye.component.html',
  styleUrls: ['./upload-file-envoye.component.scss']
})
export class UploadFileEnvoyeComponent implements OnInit {

  /**
   * Nom du projet
   */
  projet: string;
  /**
   * Url de retour à l'accueil
   */
  urlAccueil = 'http://studiouxui.net:8080';

  /**
   * Constructeur
   * @param router
   * @param userService 
   */
  constructor(private router: Router,
    private userService: UserService) { }

  /**
   * Init du composant
   */
  ngOnInit(): void {
    this.projet = this.userService.login;
  }

  /**
   * Méthode pour se rediriger vers la page d'upload
   */
  goToUploadPage() {
    this.router.navigate([RoutingConstantesPath.UPLOAD_FILE]);
  }

}
