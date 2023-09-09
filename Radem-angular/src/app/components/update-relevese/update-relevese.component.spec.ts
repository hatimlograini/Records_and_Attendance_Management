import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReleveseComponent } from './update-relevese.component';

describe('UpdateReleveseComponent', () => {
  let component: UpdateReleveseComponent;
  let fixture: ComponentFixture<UpdateReleveseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReleveseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReleveseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
