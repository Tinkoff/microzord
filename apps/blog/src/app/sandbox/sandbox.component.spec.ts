import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SandboxComponent} from './sandbox.component';
import {RooferHostModule} from '@roofer/angular';

describe('SandboxComponent', () => {
  let component: SandboxComponent;
  let fixture: ComponentFixture<SandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SandboxComponent, RooferHostModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
