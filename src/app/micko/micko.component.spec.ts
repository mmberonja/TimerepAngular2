import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MickoComponent } from './micko.component';

describe('MickoComponent', () => {
  let component: MickoComponent;
  let fixture: ComponentFixture<MickoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MickoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MickoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
