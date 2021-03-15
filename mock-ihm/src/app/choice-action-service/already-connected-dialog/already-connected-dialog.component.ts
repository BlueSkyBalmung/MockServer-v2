import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../shared/services/user.service';
import {RoutingConstantesPath} from '../../shared/constantes/routing-path';
import {Router} from '@angular/router';

@Component({
  selector: 'app-already-connected-dialog',
  templateUrl: './already-connected-dialog.component.html',
  styleUrls: ['./already-connected-dialog.component.scss']
})
export class AlreadyConnectedDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlreadyConnectedDialogComponent>,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Ferme la poppin
   */
  closeDialog() {
    this.dialogRef.close('close dialog');
  }

  /**
   * Détermine si l'utilisateur est déjà connecté
   */
  refuseLogin(): void{
    this.userService.authenticate = false;
    this.closeDialog();
  }

  projectName() {
    return this.userService.login;
  }

  acceptLogin(): void {
    this.router.navigate([RoutingConstantesPath.UPLOAD_FILE]);
    this.closeDialog();
  }
}
