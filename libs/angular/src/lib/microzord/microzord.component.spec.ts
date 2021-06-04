import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MicrozordDirective} from './microzord.directive';

describe('MicrozordDirective', () => {
  let component: MicrozordDirective;
  let fixture: ComponentFixture<MicrozordDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrozordDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrozordDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
