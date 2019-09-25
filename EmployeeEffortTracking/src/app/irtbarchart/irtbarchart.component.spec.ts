import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrtbarchartComponent } from './irtbarchart.component';

describe('IrtbarchartComponent', () => {
  let component: IrtbarchartComponent;
  let fixture: ComponentFixture<IrtbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrtbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrtbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
