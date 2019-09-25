import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallapplicationComponent } from './overallapplication.component';

describe('OverallapplicationComponent', () => {
  let component: OverallapplicationComponent;
  let fixture: ComponentFixture<OverallapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
