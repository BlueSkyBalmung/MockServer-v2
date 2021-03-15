import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /**
   * Boolean servant au toggle de l'affichage du spinner
   */
  private shouldShowSpinner = false;

  isErrorSpinner = false;

  error: HttpErrorResponse;

  constructor() {
  }

  /**
   * Affiche le spinner
   */
  public showSpinner(): void {
    this.shouldShowSpinner = true;
  }

  /**
   * Masque le spinner
   */
  public hideSpinner(): void {
    setTimeout( () => {
      this.shouldShowSpinner = false;
      console.log(this.shouldShowSpinner);
    },2000);
  }

  /**
   * Get pour savoir si le spinner est visible ou non
   */
  public isSpinnerVisible(): boolean {
    return this.shouldShowSpinner;
  }

  public setError(error: HttpErrorResponse): void {
    this.error = error;
  }
}
