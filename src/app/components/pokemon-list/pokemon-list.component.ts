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
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(private pokemonService: PokemonService,
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
            element: details.types[0]?.type?.name,
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
        !this.selectedElement || pokemon.element === this.selectedElement;
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
    this.router.navigate(['/pokemon-detail', pokemon.name]);
  }

  navigateToTableSubmission() {
    this.router.navigate(['/pokemon-table-submission']);
  }
}
