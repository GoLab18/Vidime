import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelStatisticsComponent } from './channel-statistics.component';

describe('ChannelStatisticsComponent', () => {
  let component: ChannelStatisticsComponent;
  let fixture: ComponentFixture<ChannelStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
