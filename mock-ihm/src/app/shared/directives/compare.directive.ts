import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Input} from '@angular/core';
import {Subscription} from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true}]
})
export class CompareDirective implements Validator {

  constructor() { }
  // tslint:disable-next-line:no-input-rename
  @Input('compare') controlToCompare;
  validate(c: AbstractControl): ValidationErrors | null {
    if ( c.value === null) {
      return null;
    }
    if (this.controlToCompare) {
      const subscription: Subscription = this.controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return this.controlToCompare && this.controlToCompare.value !== c.value ? {compare: true } : null;
  }

}
