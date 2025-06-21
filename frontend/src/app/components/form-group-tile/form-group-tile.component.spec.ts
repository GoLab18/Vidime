import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupTileComponent } from './form-group-tile.component';

describe('FormGroupTileComponent', () => {
  let component: FormGroupTileComponent;
  let fixture: ComponentFixture<FormGroupTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
