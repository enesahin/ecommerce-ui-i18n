import { Component } from '@angular/core';
import { Cart } from './Models/Cart';
import { CartService } from './Services/cart.service';
import { AuthenticationService } from './Services/authentication.service';
import { AlertService } from './Services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cartList: Cart[];

  constructor(private cartService: CartService,
    public authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.cartList = this.cartService.CartList;
  }

  totalCount(): number {
    this.cartList = this.cartService.CartList;
    let x = 0;
    if (this.cartList == undefined) {
      return x;
    } else {
      this.cartList.forEach(function (item) {
        x += item.Count;
      })
      return x;
    }
  }

  logout() {
    this.cartService.CartList.splice(0, this.cartService.CartList.length);
    this.authenticationService.logout();
    this.alertService.success("You have successfully logged out!", false);
  }

  updatedUserName(): string {
    return localStorage.getItem("User");
  }

}
