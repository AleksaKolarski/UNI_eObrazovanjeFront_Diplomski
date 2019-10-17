import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNameComponent } from './result-name.component';

describe('ResultNameComponent', () => {
  let component: ResultNameComponent;
  let fixture: ComponentFixture<ResultNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
