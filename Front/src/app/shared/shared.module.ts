import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { MessageComponent } from './components/message/message.component';
import {RippleModule} from "primeng/ripple";
import { LoadingComponent } from './components/loading/loading.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { WidgetComponent } from './components/widget/widget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PrimengModule,
    RippleModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      tertiaryColour: '#1976d2',
      fullScreenBackdrop: true,
    }),
  ],
  declarations: [
    MessageComponent,
    LoadingComponent,
    ErrorPageComponent,
    WidgetComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    RippleModule,
    MessageComponent,
    LoadingComponent,
    ErrorPageComponent,
    WidgetComponent
  ],
  providers: [
    
  ]
})
export class SharedModule { }
