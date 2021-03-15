import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { ChoiceActionServiceComponent } from './choice-action-service/choice-action-service.component';
import {MaterialModule} from './shared/material/material.module';
import { CreateProjectComponent } from './choice-action-service/create-project/create-project.component';
import { AuthenticationProjectComponent } from './choice-action-service/authentication-project/authentication-project.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import { UploadFileEnvoyeComponent } from './upload-file-envoye/upload-file-envoye.component';
import {AlreadyConnectedDialogComponent} from './choice-action-service/already-connected-dialog/already-connected-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceActionServiceComponent,
    CreateProjectComponent,
    AuthenticationProjectComponent,
    AlreadyConnectedDialogComponent,
    UploadFileComponent,
    UploadFileEnvoyeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    { // Service d'interception des requêtes HTTP
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
