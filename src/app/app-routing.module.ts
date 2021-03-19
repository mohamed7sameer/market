import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { GoodsComponent } from './components/goods/goods.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AuthGuard2Service } from './services/guards/auth-guard2.service';

const routes: Routes = [
  {path: '', component: HomeComponent,data:{myIndex:0}},
  {path: 'login', component: LoginComponent,canActivate: [AuthGuard2Service],data:{myIndex:1}},
  {path: 'signup', component: SignupComponent,canActivate: [AuthGuard2Service],data:{myIndex:2}},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService],data:{myIndex:3}},
  {path: 'admin', component: GoodsComponent, canActivate: [AuthGuardService],data:{myIndex:4}},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
