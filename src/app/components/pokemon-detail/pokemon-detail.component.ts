import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,
  
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
  @Input() theme: 'light'|'dark' = 'light';
  pokemonDetails: any = null;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  
 async fetchData(){
    const url = this.route.snapshot.paramMap.get('name');
    console.log(url);
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${url}`;
    this.pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonUrl);
  }
}