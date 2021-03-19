import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(private as: AuthService,private us: UserService,private router: Router) { }

  ngOnInit(): void {
  }
  errorMessage:string = ''
  clicked = false
  signup(form){
    this.clicked = true
    let data:User = form.value
    this.as.signup(data.email,data.password)
    .then(result =>{
      this.errorMessage = ''
      this.us.addNewUser(result.user.uid, data.name, data.address)
        .then(()=>{
          this.router.navigate(['/'])
        })
        .catch((err)=>{
          this.errorMessage = err.message
        })
    })
    .catch(err => this.errorMessage = err.message)
    .finally(()=>{
      this.clicked = false
    })
  }

}
