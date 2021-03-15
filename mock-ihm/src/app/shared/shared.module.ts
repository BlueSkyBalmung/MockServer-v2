import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { CompareDirective } from './directives/compare.directive';
import { PopinErrorUploadComponent } from './components/popin-error-upload/popin-error-upload.component';



@NgModule({
  declarations: [SpinnerComponent, DragDropDirective, CompareDirective, CompareDirective, PopinErrorUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CompareDirective,
    DragDropDirective,
    SpinnerComponent,
    PopinErrorUploadComponent
  ]
})
export class SharedModule { }
