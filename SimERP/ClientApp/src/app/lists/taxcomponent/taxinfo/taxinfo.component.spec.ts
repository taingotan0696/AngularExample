import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxinfoComponent } from './taxinfo.component';

describe('TaxinfoComponent', () => {
  let component: TaxinfoComponent;
  let fixture: ComponentFixture<TaxinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
