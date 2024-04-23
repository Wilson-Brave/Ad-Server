import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherAdsPageComponent } from './publisher-ads-page.component';

describe('PublisherAdsPageComponent', () => {
  let component: PublisherAdsPageComponent;
  let fixture: ComponentFixture<PublisherAdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublisherAdsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherAdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
