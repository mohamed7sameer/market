import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit,OnDestroy {

  constructor(private as: AuthService,private router: Router,private us : UserService) { }


  error;
  clicked = false
  ngOnInit(): void {
  }


  myGetUser : Subscription
  login(form){
    this.clicked = true
    let data = form.value;
    this.as.login(data.email,data.password)
    .then((result) => {
      this.router.navigate(['/'])
    })
    .catch(err =>{
      this.error = err.message
    }).finally(()=>{
      this.clicked = false
    })
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // this.myGetUser.unsubscribe()
  }

}







