import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCategoryComponent } from './one-category.component';

describe('OneCategoryComponent', () => {
  let component: OneCategoryComponent;
  let fixture: ComponentFixture<OneCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
