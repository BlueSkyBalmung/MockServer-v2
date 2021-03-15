import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {RoutingConstantesPath} from '../../shared/constantes/routing-path';
import {Router} from '@angular/router';
import {AuthorizedPathsService} from '../../shared/services/authorized-paths.service';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  createProjectStorage = 'createProjectStorage';

  /**
   * LAbel de base pour les controls dynamiques
   */
  formControlService = 'serviceControl';
  /**
   * LAbel de base pour les controls dynamiques
   */
  formControlPassword = 'passwordControl';

  /**
   * LAbel de base pour les controls dynamiques
   */
  formControlSamePassword = 'samePasswordControl';


  /**
   * Permet d'injecter le formulaire de la page
   */
  @Input() formGroup: FormGroup;

  /**
   * validateur du champ service
   */
  serviceControl: FormControl;

  /**
   * Validateur du password
   */
  passwordControl: FormControl;

  /**
   * Validateur du samepassword
   */
  samePasswordControl: FormControl;

  /**
   * indique si la création a déjà raté
   */
  creationFailed: boolean;

  /**
   * Permet d'envoyer un flip de card
   */
  @Output() valueEmitter = new EventEmitter<string>();

  /*
   * retour erreur du serveur
   */
  errorServer: string;
  serverOk: string;

  constructor(private userService: UserService,
              private router: Router,
              private authorizedPath: AuthorizedPathsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.serviceControl =  new FormControl('', [Validators.required]);
    this.passwordControl =  new FormControl('', [Validators.required]);
    this.samePasswordControl = new FormControl('', [Validators.required]);

    this.formGroup.addControl(this.formControlService, this.serviceControl);
    this.formGroup.addControl(this.formControlPassword, this.passwordControl);
    this.formGroup.addControl(this.formControlSamePassword, this.samePasswordControl);
  }

  /**
   * Fonction de Flip pour aller vers la carte Authentifier
   */
  flipToAuthentication(): void {
    this.valueEmitter.emit('flipToAuthentication');
  }

  /**
   * appel pour créer le service
   */
  createService() {
    this.serverOk = '';
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userService.callInitService(this.serviceControl.value, this.passwordControl.value).subscribe(response => {
        if (response.isSuccess){
          this.authorizedPath.addPath(RoutingConstantesPath.UPLOAD_FILE);
          this.router.navigate([RoutingConstantesPath.UPLOAD_FILE]);
        } else {
          this.errorServer = response.message;
          this.creationFailed = true;
        }
      });
    }
  }


}
