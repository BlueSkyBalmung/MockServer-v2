import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceActionServiceComponent } from './choice-action-service.component';

describe('ChoiceActionServiceComponent', () => {
  let component: ChoiceActionServiceComponent;
  let fixture: ComponentFixture<ChoiceActionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceActionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceActionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
