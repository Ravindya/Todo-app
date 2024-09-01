import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Auth, getAuth, GoogleAuthProvider, signInWithPopup} from "@angular/fire/auth";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../service/auth.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(public authService:AuthService, private titleService:Title) {
    titleService.setTitle("Sign In - To-do List App")
  }

}
