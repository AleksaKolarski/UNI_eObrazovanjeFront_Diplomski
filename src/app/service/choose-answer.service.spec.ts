import { TestBed } from '@angular/core/testing';

import { ChooseAnswerService } from './choose-answer.service';

describe('ChooseAnswerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChooseAnswerService = TestBed.get(ChooseAnswerService);
    expect(service).toBeTruthy();
  });
});
