import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnebookComponent } from './onebook.component';

describe('OnebookComponent', () => {
  let component: OnebookComponent;
  let fixture: ComponentFixture<OnebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
