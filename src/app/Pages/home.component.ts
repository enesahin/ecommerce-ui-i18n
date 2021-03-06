import { Component } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/product.service';
import { CartService } from '../Services/cart.service';
import { Cart } from '../Models/Cart';
import { Router } from '../../../node_modules/@angular/router';
import { AlertService } from '../Services/alert.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent {

    cartList: Cart[] = [];
    productList: Product[] = [];

    constructor(private productService: ProductService,
        private router: Router,
        private cartService: CartService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
        productService.getProducts().subscribe(data => this.productList = data);
        this.cartService.CartList = this.cartList;
    }

    addCart(product: Product) {
        if (this.authenticationService.loginCheck()) {

            const item = this.cartList.find(x => x.ProductId == product.ProductId);

            if (item != null) {

                item.Count++

            } else {

                this.cartList.push({
                    'ProductId': product.ProductId, 'ProductName': product.Name
                    , 'Count': 1, 'ProductPrice': product.Price
                });
            }
        } else {
            this.router.navigate(['/login']);
            this.alertService.error('You must login to buy.', false);
        }
    }

    goInfo(ProdId: number) {
        this.router.navigate(['detail', ProdId]);
    }
}