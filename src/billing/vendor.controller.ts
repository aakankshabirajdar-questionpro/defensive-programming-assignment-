import { Controller, Get, Query } from '@nestjs/common';

@Controller('vendor')
export class VendorController {

  @Get('verify')
  verifyCoupon(
    @Query('couponCode') couponCode: string,
  ) {
    return {
      valid: couponCode === 'PAYTM100',
    };
  }
}