
import {MatDialog} from '@angular/material/dialog';
import {PopinErrorUploadComponent} from '../shared/components/popin-error-upload/popin-error-upload.component';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SpinnerService} from '../shared/components/spinner/spinner.service';
import {UserService} from '../shared/services/user.service';
import {UploadFileService} from '../shared/services/upload-file.service';
import {Router} from '@angular/router';
import {RoutingConstantesPath} from '../shared/constantes/routing-path';
import {FileConstantes} from '../shared/constantes/files';
import {AuthorizedPathsService} from '../shared/services/authorized-paths.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  formGroup: FormGroup;

  files: any = [];

  login: string;

  msgErreur: string;

  /**
   * Constructeur
   * @param formBuilder fb
   * @param userService userservice
   * @param spinnerService
   * @param dialog
   * @param uploadFileService upload
   * @param authorizedPath
   * @param router
   */
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private spinnerService: SpinnerService,
              private uploadFileService: UploadFileService,
              private authorizedPath: AuthorizedPathsService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      file: []
    });
    this.login = this.userService.login;
  }

  /**
   * Méthode d'upload des fichiers
   */
  uploadFiles(): void {

    const formData: FormData = new FormData();
    formData.append('login', this.userService.login);
    formData.append('password', this.userService.password);

    console.log(this.userService.login);
    console.log(this.userService.password);
    if (this.files.length > 0) {
      console.log('nro des files:' + this.files.length);
      this.files.forEach((file, index) => {
        console.log(file);
        formData.append(file.name, file, file.name);
      });
      this.uploadFileService.uploadFile(formData).subscribe(res => {
          this.spinnerService.showSpinner();
          setTimeout( () => {
            this.authorizedPath.addPath(RoutingConstantesPath.UPLOAD_FILE_ENVOYE);
            this.router.navigate([RoutingConstantesPath.UPLOAD_FILE_ENVOYE]);
          }, 2000);
        },
        error1 => {
          this.dialog.open(PopinErrorUploadComponent, {
            data: {}
          });
        });
    }
  }

  /**
   * Méthode pour upload un file
   * @param event
   */
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      console.log('fileServer: ' + element.name);
      this.msgErreur = '';
      if (FileConstantes.DIST_FILE === element.name ||
        FileConstantes.MOCK_FILE === element.name ||
        FileConstantes.SERVER_FILE === element.name ) {
        let exist = false;
        this.files.forEach( f => {
          if (f.name === element.name) {
            exist = true;
          }
        });

        if (!exist) {
          this.files.push(element);
        } else {
          this.msgErreur = FileConstantes.FILE_DEJA_UPLOADE;
        }
      } else {
        this.msgErreur = FileConstantes.FILE_NOM_INCORRECTE;
      }
    }
  }

  /**
   * Méthode pour supprimir un file
   * @param index
   */
  deleteFile(index): void {
    this.files.splice(index, 1);
  }

  /**
   * Permet de renvoyer le spinner
   */
  getSpinnerInfos(): SpinnerService {
    return this.spinnerService;
  }
}
