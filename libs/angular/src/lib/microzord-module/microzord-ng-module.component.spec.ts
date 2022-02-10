import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MicrozordNgModuleDirective} from './microzord-ng-module.directive';

describe('MicrozordModuleDirective', () => {
  let component: MicrozordNgModuleDirective;
  let fixture: ComponentFixture<MicrozordNgModuleDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrozordNgModuleDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrozordNgModuleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
