import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Observable, timestamp} from "rxjs";

export type Task ={
  _id:string,
  description:string,
  completed:boolean,
  user:string,
  timestamp:Timestamp
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // constructor(private fireStore:Firestore) {
  //   console.log(fireStore);
  //   const tskCollectionRef = collection(fireStore,"tasks");
  //
  //   // getDocs(tskCollectionRef).then(querySnapshot =>{
  //   //   querySnapshot.forEach(doc=>{
  //   //     console.log(doc.data());
  //   //   })
  //   // })
  //    collectionData(tskCollectionRef).subscribe((docs:[])=>console.log(docs))
  // }

  private taskCollectionRef:any;
  constructor(private fireStore:Firestore) {
    this.taskCollectionRef = collection(fireStore,"tasks");
    this.getTasks("tharindu@ijse.lk")
  }
  getTasks(user:string){
    //SELECT * FROM task WHERE user = 'tharindu@ijse.lk'
    const queryGetTasks = query(this.taskCollectionRef,where("user","==",user));
    return collectionData(queryGetTasks , {idField:"_id"}) as Observable<Task[]>;
  }

  removeTask(task: Task) {
    deleteDoc(doc(this.taskCollectionRef,task._id));
  }

  updateTaskStatus(task:Task){
    const docRef = doc(this.taskCollectionRef,task._id);
    updateDoc(docRef,{completed:!task.completed});
  }

  async createNewTask(description:string,user:string){
    const newTask = {
      description,
      user,
      completed:false,
      timestamp:Timestamp.now()
    };
    await addDoc(this.taskCollectionRef,newTask);
  }
}
