import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AccessDeniedPageComponent } from "./access-denied-page/access-denied-page.component";

const routes: Routes = [
  {
    path: 'PageNotFound',
    component: PageNotFoundComponent
  },
  {
    path: 'AccessDeniedPage',
    component: AccessDeniedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule{}
