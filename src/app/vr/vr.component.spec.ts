import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRComponent } from './vr.component';

describe('VRComponent', () => {
  let component: VRComponent;
  let fixture: ComponentFixture<VRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
