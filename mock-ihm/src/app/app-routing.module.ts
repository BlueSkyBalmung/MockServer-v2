import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutingConstantesPath} from './shared/constantes/routing-path';
import {ChoiceActionServiceComponent} from './choice-action-service/choice-action-service.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {environment} from '../environments/environment.prod';
import { UploadFileEnvoyeComponent } from './upload-file-envoye/upload-file-envoye.component';
import {GuardService} from './shared/services/guard.service';


const routes: Routes = [
  {
    path: '',
    children : [
      {
        /**
         * page par défaut.
         * Ne demande aucun accès particulier
         */
        path: '',
        canActivateChild: [GuardService],

      children: [
        {
        /**
         * page par défaut.
         * Ne demande aucun accès particulier
         */
          path: '',
          redirectTo: RoutingConstantesPath.AUTHENTICATION_PROJECT,
          pathMatch: 'full'
        },
        {
          path: RoutingConstantesPath.AUTHENTICATION_PROJECT,
          component: ChoiceActionServiceComponent
        },
        {
          path: RoutingConstantesPath.UPLOAD_FILE,
          component: UploadFileComponent
        },
        {
          path: RoutingConstantesPath.UPLOAD_FILE_ENVOYE,
          component: UploadFileEnvoyeComponent
        }
      ]
      }
    ]

  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    enableTracing: !environment.production,
    useHash: true, onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
