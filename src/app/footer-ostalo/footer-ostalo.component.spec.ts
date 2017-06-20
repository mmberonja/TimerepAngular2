import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOstaloComponent } from './footer-ostalo.component';

describe('FooterOstaloComponent', () => {
  let component: FooterOstaloComponent;
  let fixture: ComponentFixture<FooterOstaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterOstaloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOstaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
