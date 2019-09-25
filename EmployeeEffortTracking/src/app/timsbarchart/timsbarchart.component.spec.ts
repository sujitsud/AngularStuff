import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimsbarchartComponent } from './timsbarchart.component';

describe('TimsbarchartComponent', () => {
  let component: TimsbarchartComponent;
  let fixture: ComponentFixture<TimsbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimsbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimsbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
