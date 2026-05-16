import { Test, TestingModule } from '@nestjs/testing';
import { CalendarNotesController } from './calendar-notes.controller';
import { CalendarNotesService } from './calendar-notes.service';

describe('CalendarNotesController', () => {
  let controller: CalendarNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarNotesController],
      providers: [CalendarNotesService],
    }).compile();

    controller = module.get<CalendarNotesController>(CalendarNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
