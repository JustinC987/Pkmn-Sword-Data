import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeitiveTeamBuilderComponent } from './compeitive-team-builder.component';

describe('CompeitiveTeamBuilderComponent', () => {
  let component: CompeitiveTeamBuilderComponent;
  let fixture: ComponentFixture<CompeitiveTeamBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompeitiveTeamBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeitiveTeamBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
