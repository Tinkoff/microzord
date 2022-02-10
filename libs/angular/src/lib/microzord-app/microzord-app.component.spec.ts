import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MicrozordAppDirective} from './microzord-app.directive';

describe('MicrozordAppDirective', () => {
  let component: MicrozordAppDirective;
  let fixture: ComponentFixture<MicrozordAppDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrozordAppDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrozordAppDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
