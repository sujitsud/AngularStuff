import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BprtrendchartComponent } from './bprtrendchart.component';

describe('BprtrendchartComponent', () => {
  let component: BprtrendchartComponent;
  let fixture: ComponentFixture<BprtrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BprtrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BprtrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
