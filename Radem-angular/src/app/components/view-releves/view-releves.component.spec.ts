import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRelevesComponent } from './view-releves.component';

describe('ViewRelevesComponent', () => {
  let component: ViewRelevesComponent;
  let fixture: ComponentFixture<ViewRelevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRelevesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRelevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
