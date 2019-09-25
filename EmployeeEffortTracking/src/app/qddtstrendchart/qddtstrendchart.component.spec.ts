import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QddtstrendchartComponent } from './qddtstrendchart.component';

describe('QddtstrendchartComponent', () => {
  let component: QddtstrendchartComponent;
  let fixture: ComponentFixture<QddtstrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QddtstrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QddtstrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
