import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThriftComponent } from './thrift.component';

describe('ThriftComponent', () => {
  let component: ThriftComponent;
  let fixture: ComponentFixture<ThriftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThriftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
