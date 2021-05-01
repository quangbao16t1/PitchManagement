import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPitchDetailComponent } from './sub-pitch-detail.component';

describe('SubPitchDetailComponent', () => {
  let component: SubPitchDetailComponent;
  let fixture: ComponentFixture<SubPitchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPitchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPitchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
