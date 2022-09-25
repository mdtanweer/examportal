import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.loginService.isLoggedIn() && this.loginService.getRole()=='ROLE_ADMIN'){
        return true;
      }else{
        console.log("isLoggedIn value:"+this.loginService.isLoggedIn());
        console.log("Role value:"+this.loginService.getRole());
      }

      this.router.navigate(['login'])
      return false;
  }
  
}
