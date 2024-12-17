import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormSubmissionsComponent } from './pokemon-form-submissions.component';

describe('PokemonFormSubmissionsComponent', () => {
  let component: PokemonFormSubmissionsComponent;
  let fixture: ComponentFixture<PokemonFormSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonFormSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFormSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
