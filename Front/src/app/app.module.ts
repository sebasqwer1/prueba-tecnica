import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from './shared/shared.module';
import { InterceptorProviders } from './core/interceptors/interceptors';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://192.168.3.66:5000', options: {} };


@NgModule({
  declarations: [
    ContentLayoutComponent,
    SidebarComponent,
    MenuItemComponent,
    AppComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    SharedModule,
    ToastModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 4000,
      progressBar: true,
      preventDuplicates: true
    })
  ],
  
  providers: [
    InterceptorProviders,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
