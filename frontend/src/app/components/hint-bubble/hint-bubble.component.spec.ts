import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintBubbleComponent } from './hint-bubble.component';

describe('HintBubbleComponent', () => {
  let component: HintBubbleComponent;
  let fixture: ComponentFixture<HintBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
