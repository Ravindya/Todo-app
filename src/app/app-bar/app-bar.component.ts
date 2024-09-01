import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../service/auth.service";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgIf
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent implements AfterViewInit{
  @ViewChild("profilePic")
  private profilePicRef!:ElementRef<HTMLDivElement>
  isMenuVisible=false;
 constructor(protected authService:AuthService) {
 }

 ngAfterViewInit():void{
   this.profilePicRef.nativeElement.style.backgroundImage=`url('${this.authService.getPrincipal()?.photoURL}')`;
 }

 @HostListener("document:click",['$event'])
  onDocumentClick(event:MouseEvent){
   this.isMenuVisible = false;
 }
}
