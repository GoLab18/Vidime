import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWatchPanelComponent } from './video-watch-panel.component';

describe('VideoWatchPanelComponent', () => {
  let component: VideoWatchPanelComponent;
  let fixture: ComponentFixture<VideoWatchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoWatchPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoWatchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
