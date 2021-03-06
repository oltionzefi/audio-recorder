import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RecordService } from './record.service';

describe('RecordService', () => {
  let service: RecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
