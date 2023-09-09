import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPresentComponent } from './view-present.component';

describe('ViewPresentComponent', () => {
  let component: ViewPresentComponent;
  let fixture: ComponentFixture<ViewPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPresentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
