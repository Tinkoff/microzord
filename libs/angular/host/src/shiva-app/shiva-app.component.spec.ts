import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShivaAppDirective} from './shiva-app.directive';

describe('ShivaAppDirective', () => {
  let component: ShivaAppDirective;
  let fixture: ComponentFixture<ShivaAppDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShivaAppDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShivaAppDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
