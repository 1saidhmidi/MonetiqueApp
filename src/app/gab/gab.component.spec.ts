import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabComponent } from './gab.component';

describe('GabComponent', () => {
  let component: GabComponent;
  let fixture: ComponentFixture<GabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
