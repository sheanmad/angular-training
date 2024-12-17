import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,
  
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
  @Input() theme: 'light'|'dark' = 'light';
  pokemonDetails: any = null;
  evolutionChain: any[] = [];
  selectedEvolutionIndex: number = 0;

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

  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
  private realtimeDatabaseService: RealtimeDatabaseService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  
 async fetchData(){
    const name = this.route.snapshot.paramMap.get('name');
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    this.pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonUrl);

    const species = await this.pokemonService.getPokemonSpecies(pokemonUrl);
    const evolutionChainUrl = species.evolution_chain.url;
    const chainData = await this.pokemonService.getEvolutionChain(evolutionChainUrl);

    this.evolutionChain = this.parseEvolutionChain(chainData.chain);
    this.selectedEvolutionIndex = this.evolutionChain.findIndex(
      (pokemon) => pokemon.name ===name
    );
  }

  playPokemonCry() {
    const cryUrl = this.pokemonDetails.cries?.latest || this.pokemonDetails.cries?.legacy;
    if (!cryUrl) {
      console.error('No cry URL available for this Pokémon.');
      return;
    }

    const audio = new Audio(cryUrl);
    audio.play().catch((err) => {
      console.error('Error playing the Pokémon cry:', err);
    });
  }

  parseEvolutionChain(chain: any): any[]{
    const chainArray = [];
    let current = chain;

    while (current) {
      chainArray.push({
        name: current.species.name,
        url: `https://pokeapi.co/api/v2/pokemon/${current.species.name}`
      });
      current = current.evolves_to[0];
    }

    return chainArray;
  }

  async evolve() {
    if (this.selectedEvolutionIndex < this.evolutionChain.length - 1) {
      this.selectedEvolutionIndex++;
      const nextPokemonName = this.evolutionChain[this.selectedEvolutionIndex].name;

      this.router.navigate([`pokemon-detail/${nextPokemonName}`]);
      await this.loadPokemonDetails();
    }
  }

  async devolve() {
    if (this.selectedEvolutionIndex > 0) {
      this.selectedEvolutionIndex--;
      const prevPokemonName = this.evolutionChain[this.selectedEvolutionIndex].name;

      this.router.navigate([`pokemon-detail/${prevPokemonName}`]);
      await this.loadPokemonDetails();
    }
  }

  async loadPokemonDetails() {
    const currentEvolution = this.evolutionChain[this.selectedEvolutionIndex];
    this.pokemonDetails = await this.pokemonService.getPokemonDetails(currentEvolution.url);
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || this.typeColors['unknown'];
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