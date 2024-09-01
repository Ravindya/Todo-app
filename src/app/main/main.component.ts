import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AppBarComponent } from "../app-bar/app-bar.component";
import { Task, TaskService } from "../service/task.service";
import { AuthService } from "../service/auth.service";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/firestore'; // Import Firestore

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AppBarComponent,
    MatCheckbox,
    MatIcon,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    FormsModule,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  taskList: Array<Task> = [];
  description = "";
  isLoading = true;

  constructor(
    titleService: Title,
    protected authService: AuthService,
    protected taskService: TaskService
  ) {
    titleService.setTitle("To-do List App");
    taskService.getTasks(authService.getPrincipalEmail()!)
      .subscribe(tasksList => {
        this.taskList = tasksList;
        this.isLoading = false;
        this.taskList.sort((task1: Task, task2: Task) => {
          // Check if timestamp is a Firestore Timestamp or a Date
          const time1 = task1.timestamp instanceof firebase.firestore.Timestamp
            ? task1.timestamp.toMillis()
            : task1.timestamp instanceof Date
              ? task1.timestamp.getTime()
              : 0; // Default value or error handling

          const time2 = task2.timestamp instanceof firebase.firestore.Timestamp
            ? task2.timestamp.toMillis()
            : task2.timestamp instanceof Date
              ? task2.timestamp.getTime()
              : 0; // Default value or error handling

          return time1 - time2;
        });
      });
  }

  async addTask(txt: HTMLInputElement) {
    if (!this.description.trim().length) {
      txt.select();
      txt.focus();
      return;
    } else {
      try {
        await this.taskService.createNewTask(this.description, this.authService.getPrincipalEmail()!);
        this.description = "";
        txt.focus();
      } catch (e) {
        console.log(e);
        alert("Failed to save the task, Try again!");
      }
    }
  }
}

