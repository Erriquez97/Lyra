import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectedProjectGuard } from './selected-project.guard';

describe('selectedProjectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selectedProjectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
