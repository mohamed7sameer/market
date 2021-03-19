import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2Service implements CanActivate{

  constructor(private as: AuthService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    return new Promise((resolve)=>{
      this.as.user.subscribe((user)=>{
        if(!user){
          resolve(true)
        }else{
          this.router.navigate(['/cart'])
          resolve(false)
        }
      })
    })

  }


}
