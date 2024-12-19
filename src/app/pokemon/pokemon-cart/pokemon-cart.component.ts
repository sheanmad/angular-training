import { Component, OnInit } from '@angular/core';
import { removeFromCart, clearCart } from '../../state/cart/cart.actions';
import { CartState } from '../../state/cart/cart.state';
import { Store } from '@ngrx/store';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
@Component({
  selector: 'app-pokemon-cart',
  standalone: false,
  
  templateUrl: './pokemon-cart.component.html',
  styleUrl: './pokemon-cart.component.css'
})
export class PokemonCartComponent implements OnInit {
  cartItems: {pokemon:any, quantity:number}[] = [];

  constructor(private store: Store<{cart: CartState}>,
    private realtimeDatabaseService: RealtimeDatabaseService,
  ) { }

  ngOnInit(): void{
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        this.cartItems = items;
      });
  }

  removeFromCart(pokemonName: string){
    this.store.dispatch(removeFromCart({pokemonName}));
  }

  clearCart(): void{
    this.store.dispatch(clearCart());
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async handleFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
    try {
      await this.realtimeDatabaseService.saveFormSubmission(formData);
      console.log('Form data saved successfully!');
    } catch (error) {
      console.error('Error saving form data:', error);
    }
    this.closeModal();
  }

}
