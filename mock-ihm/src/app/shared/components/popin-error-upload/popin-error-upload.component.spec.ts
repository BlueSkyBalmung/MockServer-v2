import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinErrorUploadComponent } from './popin-error-upload.component';

describe('PopinErrorUploadComponent', () => {
  let component: PopinErrorUploadComponent;
  let fixture: ComponentFixture<PopinErrorUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopinErrorUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopinErrorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
