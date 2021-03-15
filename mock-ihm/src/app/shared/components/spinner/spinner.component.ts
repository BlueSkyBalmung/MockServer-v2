import { Component, OnInit } from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {


  constructor(private spinnerService: SpinnerService) { }

  /**
   * Permet de recuperer les infos dans l'html
   */
  getSpinnerInfos(): SpinnerService {
    return this.spinnerService;
  }
}
