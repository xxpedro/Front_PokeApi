import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCardsComponent } from './poke-cards.component';

describe('PokeCardsComponent', () => {
  let component: PokeCardsComponent;
  let fixture: ComponentFixture<PokeCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeCardsComponent]
    });
    fixture = TestBed.createComponent(PokeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
