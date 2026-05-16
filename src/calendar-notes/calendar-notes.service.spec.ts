import { Test, TestingModule } from '@nestjs/testing';
import { CalendarNotesService } from './calendar-notes.service';

describe('CalendarNotesService', () => {
  let service: CalendarNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarNotesService],
    }).compile();

    service = module.get<CalendarNotesService>(CalendarNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
