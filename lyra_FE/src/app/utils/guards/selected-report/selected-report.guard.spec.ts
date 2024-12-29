import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectedReportGuard } from './selected-report.guard';

describe('selectedReportGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selectedReportGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
