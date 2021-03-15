import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileEnvoyeComponent } from './upload-file-envoye.component';

describe('UploadFileEnvoyeComponent', () => {
  let component: UploadFileEnvoyeComponent;
  let fixture: ComponentFixture<UploadFileEnvoyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileEnvoyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileEnvoyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
