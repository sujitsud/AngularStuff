import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrrqtrendchartComponent } from './prrqtrendchart.component';

describe('PrrqtrendchartComponent', () => {
  let component: PrrqtrendchartComponent;
  let fixture: ComponentFixture<PrrqtrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrrqtrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrrqtrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
