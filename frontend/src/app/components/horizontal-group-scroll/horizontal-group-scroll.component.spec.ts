import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGroupScrollComponent } from './horizontal-group-scroll.component';

describe('HorizontalGroupScrollComponent', () => {
  let component: HorizontalGroupScrollComponent;
  let fixture: ComponentFixture<HorizontalGroupScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalGroupScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalGroupScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
