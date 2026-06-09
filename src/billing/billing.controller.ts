import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { PricingService } from './pricing/pricing.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly pricingService: PricingService,
  ) {}

  @Post('apply-discount')
  async applyDiscount(
    @Body() body: any,
  ) {
    const finalPrice =
      await this.pricingService.applyDiscount(
        body.user,
        body.coupon,
        body.originalSubscriptionPrice,
      );

    return {
      finalPrice,
    };
  }
}