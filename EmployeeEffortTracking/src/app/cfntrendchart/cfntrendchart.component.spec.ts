import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfntrendchartComponent } from './cfntrendchart.component';

describe('CfntrendchartComponent', () => {
  let component: CfntrendchartComponent;
  let fixture: ComponentFixture<CfntrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfntrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfntrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
