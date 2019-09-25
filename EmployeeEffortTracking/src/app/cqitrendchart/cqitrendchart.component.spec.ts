import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CqitrendchartComponent } from './cqitrendchart.component';

describe('CqitrendchartComponent', () => {
  let component: CqitrendchartComponent;
  let fixture: ComponentFixture<CqitrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CqitrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CqitrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
