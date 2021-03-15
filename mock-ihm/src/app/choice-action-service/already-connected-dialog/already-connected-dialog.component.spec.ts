import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyConnectedDialogComponent } from './already-connected-dialog.component';

describe('AlreadyConnectedDialogComponent', () => {
  let component: AlreadyConnectedDialogComponent;
  let fixture: ComponentFixture<AlreadyConnectedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyConnectedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyConnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
