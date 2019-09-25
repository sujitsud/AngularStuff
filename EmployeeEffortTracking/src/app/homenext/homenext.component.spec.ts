import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenextComponent } from './homenext.component';

describe('HomenextComponent', () => {
  let component: HomenextComponent;
  let fixture: ComponentFixture<HomenextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
