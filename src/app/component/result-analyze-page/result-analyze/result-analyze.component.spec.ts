import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAnalyzeComponent } from './result-analyze.component';

describe('ResultAnalyzeComponent', () => {
  let component: ResultAnalyzeComponent;
  let fixture: ComponentFixture<ResultAnalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultAnalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
