import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {MainComponent} from "./main/main.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path:'sign-in',
    component:SignInComponent
  },
  {
    path:'',
    canActivate:[authGuard],
    component:MainComponent
  }
];
