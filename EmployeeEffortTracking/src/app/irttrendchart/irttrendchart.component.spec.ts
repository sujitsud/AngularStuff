import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrttrendchartComponent } from './irttrendchart.component';

describe('IrttrendchartComponent', () => {
  let component: IrttrendchartComponent;
  let fixture: ComponentFixture<IrttrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrttrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrttrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
