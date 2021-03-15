import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationProjectComponent } from './authentication-project.component';

describe('AuthenticationProjectComponent', () => {
  let component: AuthenticationProjectComponent;
  let fixture: ComponentFixture<AuthenticationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
