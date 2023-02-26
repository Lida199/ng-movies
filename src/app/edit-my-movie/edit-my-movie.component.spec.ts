import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyMovieComponent } from './edit-my-movie.component';

describe('EditMyMovieComponent', () => {
  let component: EditMyMovieComponent;
  let fixture: ComponentFixture<EditMyMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
