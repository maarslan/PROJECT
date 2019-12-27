import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPasswordComponent } from './company-password.component';

describe('CompanyPasswordComponent', () => {
  let component: CompanyPasswordComponent;
  let fixture: ComponentFixture<CompanyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
