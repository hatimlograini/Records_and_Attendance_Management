import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelevesComponent } from './add-releves.component';

describe('AddRelevesComponent', () => {
  let component: AddRelevesComponent;
  let fixture: ComponentFixture<AddRelevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRelevesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRelevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
