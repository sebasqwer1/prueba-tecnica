import { NgModule, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';

import { ErrorRoutingModule } from './error-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';


@NgModule({
  //Aqui va los componentes
  declarations: [
    PageNotFoundComponent,
    AccessDeniedPageComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule,
    RippleModule,
    TagModule

  ]
})
export class ErrorModule implements OnDestroy{ 
  subscriptionTranslateService ?: Subscription;

  constructor(private config: PrimeNGConfig) {

  }
  ngOnDestroy() {
    if (this.subscriptionTranslateService) {
        this.subscriptionTranslateService.unsubscribe();
    }
  }

}