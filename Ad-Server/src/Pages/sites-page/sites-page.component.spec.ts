import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesPageComponent } from './sites-page.component';

describe('SitesPageComponent', () => {
  let component: SitesPageComponent;
  let fixture: ComponentFixture<SitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
