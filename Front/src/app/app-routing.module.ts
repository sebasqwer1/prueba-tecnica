import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProtectedRoutes } from './core/guards/protected-routes.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContentLayoutComponent,
    children: [
      {
        path: 'adm',
        canActivate : [ProtectedRoutes],
        loadChildren: () =>
          import('./modules/adm/adm.module').then(m => m.AdmModule)
      },
      {
        path: 'error',
        loadChildren: () =>
          import('./modules/error/error.module').then(m => m.ErrorModule)  
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: 'error/PageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
