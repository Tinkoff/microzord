import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RooferAppDirective} from './roofer-app.directive';

describe('RooferAppDirective', () => {
  let component: RooferAppDirective;
  let fixture: ComponentFixture<RooferAppDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RooferAppDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RooferAppDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
