import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncaughtPokemonComponent } from './uncaught-pokemon.component';

describe('UncaughtPokemonComponent', () => {
  let component: UncaughtPokemonComponent;
  let fixture: ComponentFixture<UncaughtPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncaughtPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncaughtPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
