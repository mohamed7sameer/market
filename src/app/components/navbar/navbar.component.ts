import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit, OnDestroy {

  isUser: boolean = false
  constructor(private as: AuthService,private us: UserService) { }
  // isAdmin = this.us.isAdmin
  isAdmin = false;
  myUser : Subscription
  myGetUser : Subscription
  ngOnInit(): void {
    this.myUser = this.as.user.subscribe(user=>{
      this.isAdmin = false
      if(user){
        this.isUser = true
        this.as.userId = user.uid
        console.log('userId---->' + user.uid)
        this.myGetUser = this.us.getUser(user.uid).subscribe((data)=>{
          if(data['admin'] == true){
            this.isAdmin = true
          }else{
            this.isAdmin = false
          }
          console.log('if --->' + data['admin'])
        })
      }else{
        this.isUser = false
        this.as.userId = ''
        // this.isAdmin = false
      }
    })



  }


  logout(){
    this.as.logout()
    .then(() =>{
      console.log('succes logout')
    })
  }




  ngOnDestroy() : void{
    // this.myUser.unsubscribe();
    // this.myGetUser.unsubscribe()
  }




}
