import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserService} from '../shared/services/user.service';
import {RoutingConstantesPath} from '../shared/constantes/routing-path';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AlreadyConnectedDialogComponent} from './already-connected-dialog/already-connected-dialog.component';

@Component({
  selector: 'app-choix-action-service',
  templateUrl: './choice-action-service.component.html',
  styleUrls: ['./choice-action-service.component.scss'],
  animations: [
    trigger('flip', [
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      state('unflipped', style({ transform: 'rotateY(0)' })),
      transition('unflipped => flipped', animate('500ms ease-out')),
      transition('flipped => unflipped', animate('500ms ease-in'))
    ])
  ]
})
export class ChoiceActionServiceComponent implements OnInit {
  /**
   * état de la carte
   */
  flip = 'unflipped';

  constructor(private router: Router, private userService: UserService, private dialogAlreadyConnected: MatDialog) { }

  ngOnInit(): void {
    if (this.userService.authenticate) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.panelClass = 'already-connected';
      this.dialogAlreadyConnected.open(AlreadyConnectedDialogComponent, dialogConfig);
    }
  }

  /**
   * Retourne la carte
   *
   */
  flipCard($event: string): void {
    this.flip = (this.flip === 'unflipped') ? 'flipped' : 'unflipped';
  }

  /**
   * Est il déjà authentifier ?
   */
  isAuthenticated(): boolean {
    return this.userService.authenticate;
  }
}
