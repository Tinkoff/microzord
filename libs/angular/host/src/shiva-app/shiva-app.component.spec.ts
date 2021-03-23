import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShivaAppComponent} from './shiva-app.component';

describe('ShivaOutletComponent', () => {
  let component: ShivaAppComponent;
  let fixture: ComponentFixture<ShivaAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShivaAppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShivaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
