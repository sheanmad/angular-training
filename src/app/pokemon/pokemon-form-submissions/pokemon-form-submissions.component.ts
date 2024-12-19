import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form-submissions',
  standalone: false,
  
  templateUrl: './pokemon-form-submissions.component.html',
  styleUrls: ['./pokemon-form-submissions.component.css']
})
export class PokemonFormSubmissionsComponent implements OnInit{
  @Output() formSubmit = new EventEmitter<any>();
  @Input() pokemonDetails: any;
  @Input() evolutionChain: any[] = [];
  @Input() evolutionDetails: any[] = [];

  pokemonForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneCountryCode: new FormControl('+1', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    buyOption: new FormControl('1', [Validators.required]),
    pokemonToBuy: new FormControl<any[]>([], [Validators.required])
  });

  ngOnInit(): void {
    this.pokemonForm.controls['buyOption'].valueChanges.subscribe((buyOption) => {
      this.updatePokemonToBuy(buyOption ?? '');
    });



  }

  updatePokemonToBuy(buyOption: string): void {
    if (buyOption === 'thisEvoOnly') {
      this.pokemonForm.controls['pokemonToBuy'].setValue([this.pokemonDetails.name]);
    } else if (buyOption === 'buyAllEvolutions') {
      const evolutionNames = this.evolutionDetails.map(evo => evo.name);
      this.pokemonForm.controls['pokemonToBuy'].setValue(evolutionNames);
    }
  }

  onSubmit() {
    if (this.pokemonForm.valid) {
      this.formSubmit.emit(this.pokemonForm.value);
    }
  }
}
