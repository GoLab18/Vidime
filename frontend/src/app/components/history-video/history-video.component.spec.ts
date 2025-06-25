import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVideoComponent } from './history-video.component';

describe('HistoryVideoComponent', () => {
  let component: HistoryVideoComponent;
  let fixture: ComponentFixture<HistoryVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
