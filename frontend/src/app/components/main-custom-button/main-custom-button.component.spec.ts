import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCustomButtonComponent } from './main-custom-button.component';

describe('MainCustomButtonComponent', () => {
  let component: MainCustomButtonComponent;
  let fixture: ComponentFixture<MainCustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCustomButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
