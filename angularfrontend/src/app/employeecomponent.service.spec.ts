import { TestBed } from '@angular/core/testing';

import { EmployeecomponentService } from './employeecomponent.service';

describe('EmployeecomponentService', () => {
  let service: EmployeecomponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeecomponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
