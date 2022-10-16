import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { PaymentsInfoDto } from './dto/payments-info.dto';

// @ApiTags('Payments')
// @ApiBearerAuth()
@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  getPayments(@Req() request: Request): Promise<{ tariff: string }> {
    const user = request['user'];
    const uid: UidIdentifier = (user as { user_id: UidIdentifier })?.user_id;
    return this.paymentsService.getPaymentsByUid(uid);
  }

  @Get('/info')
  getPaymentsInfo(@Req() request: Request): Promise<PaymentsInfoDto> {
    const user = request['user'];
    const uid: UidIdentifier = (user as { user_id: UidIdentifier })?.user_id;
    return this.paymentsService.getPaymentsInfoByUid(uid);
  }

  @Post('/info')
  @UsePipes(ValidationPipe)
  setPaymentsInfo(
    @Req() request: Request,
    @Body() paymentsInfoDto: PaymentsInfoDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    const uid: UidIdentifier = (user as { user_id: UidIdentifier })?.user_id;
    return this.paymentsService.setPaymentInfoByUid(uid, paymentsInfoDto);
  }
}
