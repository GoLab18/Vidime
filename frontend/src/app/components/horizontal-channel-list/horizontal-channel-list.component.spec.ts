import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalChannelListComponent } from './horizontal-channel-list.component';

describe('HorizontalChannelListComponent', () => {
  let component: HorizontalChannelListComponent;
  let fixture: ComponentFixture<HorizontalChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalChannelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
