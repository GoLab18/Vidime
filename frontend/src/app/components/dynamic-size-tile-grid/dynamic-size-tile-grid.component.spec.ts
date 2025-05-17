import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSizeTileGridComponent } from './dynamic-size-tile-grid.component';

describe('DynamicSizeTileGridComponent', () => {
  let component: DynamicSizeTileGridComponent;
  let fixture: ComponentFixture<DynamicSizeTileGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSizeTileGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSizeTileGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
