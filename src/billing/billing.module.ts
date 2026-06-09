import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { BillingController } from './billing.controller';
import { VendorController } from './vendor.controller';
import { PricingService } from './pricing/pricing.service';

@Module({
  imports: [HttpModule],
  controllers: [BillingController,  VendorController],
  providers: [PricingService],
  exports: [PricingService],
})
export class BillingModule {}