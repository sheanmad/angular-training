import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../state/cart/cart.state';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  activeLink: string = '/';
  cartItems: {pokemon:any, quantity:number}[] = [];

  constructor(
    private store: Store<{cart: CartState}>,
    private realtimeDatabaseService: RealtimeDatabaseService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        this.cartItems = items;
      });
  }
  getCartQuantity(): number{
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return !!this.authService.getUser();
  }

  setActiveLink(link:string){
    this.activeLink=link;
  }
  isLinkActive(link: string): boolean {
    return this.activeLink === link;
  }
}
