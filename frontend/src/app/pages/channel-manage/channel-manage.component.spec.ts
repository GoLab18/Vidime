import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelManageComponent } from './channel-manage.component';

describe('ChannelManageComponent', () => {
  let component: ChannelManageComponent;
  let fixture: ComponentFixture<ChannelManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
