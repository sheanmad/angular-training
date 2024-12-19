import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: false
})
export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {

  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  paginatedPokemon: any[] = [];
  selectedPokemon: any = null;
  theme: 'light' | 'dark' = 'light';
  filter: string = '';
  selectedElement: string = '';
  elements: string[] = ['fire', 'water', 'grass', 'electric', 'ice', 'rock'];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalPages: number = 0;

  typeColors: { [key: string]: string } = {
    fire: '#F44336', // Red
    water: '#2196F3', // Blue
    grass: '#4CAF50', // Green
    electric: '#FFEB3B', // Yellow
    ice: '#03A9F4', // Light Blue
    rock: '#9E9E9E', // Gray
    bug: '#8BC34A', // Light Green
    flying: '#81D4FA', // Light Sky Blue
    poison: '#9C27B0', // Purple
    ghost: '#673AB7', // Deep Purple
    dragon: '#FF5722', // Deep Orange
    dark: '#212121', // Dark Gray
    fairy: '#E91E63', // Pink
    normal: '#9E9E9E', // Gray
    fighting: '#D32F2F', // Dark Red
    psychic: '#D500F9', // Magenta
    steel: '#607D8B', // Steel Blue
    ground: '#8B4513', // Brown
    unknown: '#9E9E9E' // Unknown or other type
  };

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    console.log('Constructor Init called');
  }

  async ngOnInit() {
    await this.fetchPokemon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Constructor Changes called');
  }

  ngOnDestroy() {
    console.log('Constructor Destroy called');
  }

  async fetchPokemon() {
    try {
      const response = await this.pokemonService.getPokemonList(150);
      this.pokemonList = await Promise.all(
        response.map(async (pokemon: any) => {
          const details = await this.pokemonService.getPokemonDetails(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: details.sprites.front_default,
            elements: details.types.map( (type:any) =>type.type.name),
          };
        })
      );
      this.filteredPokemon = this.pokemonList;
      this.updatePagination();
      this.paginate();
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  applyFilter() {
    this.filteredPokemon = this.pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(this.filter.toLowerCase());
      const matchesElement =
        !this.selectedElement || pokemon.elements.includes(this.selectedElement);
      return matchesName && matchesElement;
    });
    this.updatePagination();
    this.paginate();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredPokemon.length / this.itemsPerPage);
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  navigateToDetail(pokemon: any) {
    this.router.navigate(['/pokemon/detail', pokemon.name]);
    console.log('Pokemon name:', pokemon.name);
    console.log('Pokemon details:', pokemon);
  }

  navigateToTableSubmission() {
    this.router.navigate(['/pokemon/submission']);
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || this.typeColors['unknown'];
  }

}
