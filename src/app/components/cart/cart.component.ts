import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { shoping } from 'src/app/interfaces/shoping.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit,OnDestroy {

  cart:shoping[] = []

  constructor(private cs: CartService) { }

  error1;
  error2;
  clicked1 = false
  clicked2 = false
  myTotal:number = 0
  getCart:Subscription
  ngOnInit(): void {
    this.getCart = this.cs.getCart().subscribe((cart)=>{
      this.cart = cart.map((shoping)=>{
        this.myTotal += (shoping.payload.doc.data()['price'] * shoping.payload.doc.data()['amount'])
        return {
          id: shoping.payload.doc.id,
          ...shoping.payload.doc.data() as {}
        }
      })
    })


  }


  delete(index){
    this.clicked1 = true
    let id = this.cart[index].id
    this.cs.delete(id)
    .catch((err)=>{
      this.error1 = err.message
    })
    .finally(()=>{
      this.clicked1 = false
    })
  }

  save(index){
    this.clicked2 = true
    let id = this.cart[index].id
    let amount = this.cart[index].amount
    this.cs.save(id,amount)
    .catch((err)=>{
      this.error2 = err.message
    })
    .finally(()=>{
      this.clicked2 = false
    })
  }



  ngOnDestroy(): void{
    this.getCart.unsubscribe()
  }





}
