import { Controller, Get, Param } from '@nestjs/common';
import { CommsService, Customer, NextDeliveryDto } from './comms.service';

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/')
  getNextDelivery(): Customer[] {
    return this.commsService.getNextDelivery();
  }

  @Get('your-next-delivery/:id')
  getById(@Param('id') id: string): NextDeliveryDto {
    return this.commsService.getById(id);
  }
}
