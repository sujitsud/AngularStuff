import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimstrendchartComponent } from './timstrendchart.component';

describe('TimstrendchartComponent', () => {
  let component: TimstrendchartComponent;
  let fixture: ComponentFixture<TimstrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimstrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimstrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
