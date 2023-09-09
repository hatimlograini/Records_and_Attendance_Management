import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dasheboard2Component } from './dasheboard2.component';

describe('Dasheboard2Component', () => {
  let component: Dasheboard2Component;
  let fixture: ComponentFixture<Dasheboard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dasheboard2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dasheboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
