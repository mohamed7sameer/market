import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: AngularFirestore) { }

  // isAdmin = false

  getUser(id){
    return this.fs.collection(`users`).doc(`${id}`).valueChanges()
  }


  addNewUser(id,name,address){
    return this.fs.doc('users/' + id).set({
      name,
      address
    })
  }
}
