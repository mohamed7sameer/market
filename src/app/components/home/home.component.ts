  // home Component

  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { Subscription } from 'rxjs';
  import { Good } from 'src/app/interfaces/good.interface';
  import { AuthService } from 'src/app/services/auth.service';
  import { CartService } from 'src/app/services/cart.service';
  import { GoodsService } from 'src/app/services/goods.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
  })
  export class HomeComponent implements OnInit,OnDestroy {

    goods: Good[] = []
    add:number = -1
    goodObservable: Subscription

    constructor(private gs:GoodsService, private cs: CartService,private as: AuthService,private router: Router) { }
    error;
    clicked = false
    ngOnInit(): void {

      this.goodObservable = this.gs.getAllGoods().subscribe((data)=>{
        let x = data.map((element)=>{
          return {
            id: element.payload.doc.id,
            ...element.payload.doc.data() as {}
          }
        })
        this.goods = x
      })

    }

    ngOnDestroy(): void {
      this.goodObservable.unsubscribe()
    }


    addToCart(index){

      if(this.as.userId){
        this.add = +index
      }else{
        this.router.navigate(['/login'])
      }

    }

    buy(amount:number){
      this.clicked = true
      let selectedGood = this.goods[this.add]
      let data = {
        name: selectedGood.name,
        amount: +amount,
        price: selectedGood.price
      }
      this.cs.addToCart(data)
      .then(()=>  this.add = -1)
      .catch((err)=>{
        this.error = err.message
      })
      .finally(()=>{
        this.clicked = false
      })

    }


  }
