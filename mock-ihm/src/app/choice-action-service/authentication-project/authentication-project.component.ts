import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {RoutingConstantesPath} from '../../shared/constantes/routing-path';
import {AuthorizedPathsService} from '../../shared/services/authorized-paths.service';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-authentication-project',
  templateUrl: './authentication-project.component.html',
  styleUrls: ['./authentication-project.component.scss']
})
export class AuthenticationProjectComponent implements OnInit {

  @Input() focusable: boolean;

  serviceValidator: FormControl =  new FormControl('', [Validators.required]);

  passwordValidator: FormControl =  new FormControl('', [Validators.required]);

  /**
   * Permet d'envoyer un flip de card
   */
  @Output() valueEmitter = new EventEmitter<string>();

  /**
   * Permet d'injecter le formulaire de la page
   */
  @Input() formGroup: FormGroup;

  /**
   * LAbel de base pour les controls dynamiques
   */
  formControlService = 'serviceControl';

  /**
   * LAbel de base pour les controls dynamiques
   */
  formControlPassword = 'passwordControl';

  /**
   * indique si la création a déjà raté
   */
  authentFailed: boolean;

  /*
   * retour erreur du serveur
   */
  errorServer: string;

  constructor(private userService: UserService,
              private router: Router,
              private autorizedPath: AuthorizedPathsService,
              private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formControlService, this.serviceValidator);
    this.formGroup.addControl(this.formControlPassword, this.passwordValidator);
  }

  /**
   * envoie des données pour se connecter
   */
  connectToService() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userService.callLoginService(this.serviceValidator.value, this.passwordValidator.value).subscribe(response => {
        if (response.isSuccess){
          this.storage.store('loginValue', this.userService.login);
          this.storage.store('authenticateValue', this.userService.authenticate);
          this.autorizedPath.addPath(RoutingConstantesPath.UPLOAD_FILE);
          this.router.navigate([RoutingConstantesPath.UPLOAD_FILE]);
        } else {
          console.log(response);
          this.authentFailed = true;
          this.errorServer = response.message;
        }
      });
    }
  }

  /**
   * Fonction de Flip pour aller vers la carte créer
   */
  flipToCreate(): void {
    this.valueEmitter.emit('flipToCreate');
  }
}
