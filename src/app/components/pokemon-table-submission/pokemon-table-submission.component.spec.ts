import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTableSubmissionComponent } from './pokemon-table-submission.component';

describe('PokemonTableSubmissionComponent', () => {
  let component: PokemonTableSubmissionComponent;
  let fixture: ComponentFixture<PokemonTableSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonTableSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTableSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
