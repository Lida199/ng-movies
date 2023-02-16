import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFavoriteComponent } from './edit-favorite.component';

describe('EditFavoriteComponent', () => {
  let component: EditFavoriteComponent;
  let fixture: ComponentFixture<EditFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
