import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RxnodeComponent} from './rxnode.component';

describe('RxnodeComponent', () => {
  let component: RxnodeComponent;
  let fixture: ComponentFixture<RxnodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RxnodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
