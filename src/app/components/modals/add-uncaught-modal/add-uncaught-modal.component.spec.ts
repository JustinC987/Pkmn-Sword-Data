import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUncaughtModalComponent } from './add-uncaught-modal.component';

describe('AddUncaughtModalComponent', () => {
  let component: AddUncaughtModalComponent;
  let fixture: ComponentFixture<AddUncaughtModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUncaughtModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUncaughtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
