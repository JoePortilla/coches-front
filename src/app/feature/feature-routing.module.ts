import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardAuthService} from "../core/services/guard-auth.service";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [() => inject(GuardAuthService).canActiveLogin()],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'portfolio',
    canActivate: [() => inject(GuardAuthService).canActiveSecured()],
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {
}
