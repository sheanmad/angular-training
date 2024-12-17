import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private speciesApiUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor() { }

  async getPokemonList(limit: number =20){
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`);
    return response.data.results;
  }

  async getPokemonDetails(url: string){
    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonSpecies(pokemonUrl: string) {
    const pokemonName = pokemonUrl.split('/').filter(part => part).pop();
    const response = await axios.get(`${this.speciesApiUrl}/${pokemonName}`);
    return response.data;
  }

  async getEvolutionChain(evolutionChainUrl: string) {
    const response = await axios.get(evolutionChainUrl);
    return response.data;
  }

}
