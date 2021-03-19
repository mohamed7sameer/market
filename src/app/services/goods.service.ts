import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private fs: AngularFirestore, private storage: AngularFireStorage) { }

  getAllGoods(){
    // return this.fs.collection('goods').valueChanges()
    return this.fs.collection('goods').snapshotChanges()
  }

  addNewGoods(name: string,price: number,image:File){
    return new Promise((resolve,reject)=>{
      let ref = this.storage.ref(`goods/_${Date.now()}_${Math.floor(Math.random() * 1000000000000000) + 1}_${image.name}`)
      ref.put(image).then(()=>{
        ref.getDownloadURL().subscribe((photoUrl)=>{
          this.fs.collection('goods').add({
            name,
            price,
            photoUrl
          })
          .then(()=>{
            // alert('تم رفع الملفات بنجاح')
            resolve('تم رفع الملفات بنجاح')
          })

        })
      })
    })
  }
}
