import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Good } from 'src/app/interfaces/good.interface';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.sass']
})
export class GoodsComponent implements OnInit {


  @ViewChild('image') image:ElementRef

  constructor(private gs: GoodsService) { }


  ngOnInit(): void {
  }

  addNewGood(form: NgForm){
    let formValue = (<Good>form.value)
    let name = formValue.name
    let price = formValue.price
    let image = (<HTMLInputElement>this.image.nativeElement).files[0]
    // let image = (this.image.nativeElement as HTMLInputElement).files[0]
    this.gs.addNewGoods(name,price,image).then((msg)=>{
      console.log(msg)
    })
  }

}
