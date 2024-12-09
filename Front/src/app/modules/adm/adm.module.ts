import { NgModule } from '@angular/core';
import { AdmRoutingModule } from './adm-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    AdmRoutingModule,
    SharedModule,
    ChartModule,
    NgxChartsModule,
  ],

  providers: [
    
  ],
})
export class AdmModule {
 
}
