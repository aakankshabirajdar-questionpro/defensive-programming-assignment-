import {
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from './dto/user.dto';
import { Coupon } from './dto/coupon.dto';

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async applyDiscount(
    user: User,
    coupon: Coupon,
    originalSubscriptionPrice: number,
  ): Promise<number> {
  
    if (!user) {
      throw new BadRequestException('User is required');
    }

    if (!coupon) {
      throw new BadRequestException('Coupon is required');
    }

    if (originalSubscriptionPrice < 0) {
      throw new BadRequestException('Invalid price');
    }

    if (
      coupon.discountAmount < 1 ||
      coupon.discountAmount > 1000
    ) {
      throw new BadRequestException(
        'Discount amount must be between 1 and 1000',
      );
    }

    const assignedCoupons =
      user.assignedCouponCodes ?? [];

    if (
      !assignedCoupons.includes(coupon.code)
    ) {
      return originalSubscriptionPrice;
    }

    if (
      coupon.expiryDate &&
      new Date(coupon.expiryDate) <
        new Date()
    ) {
      return originalSubscriptionPrice;
    }

    if (coupon.isThirdParty) {
      try {
        const response =
          await firstValueFrom(
            this.httpService.get(
                'http://localhost:3000/vendor/verify',              {
                params: {
                  couponCode: coupon.code,
                },
                timeout: 3000,
              },
            ),
          );

        const isValid =
          response?.data?.valid === true;

        if (!isValid) {
          return originalSubscriptionPrice;
        }
      } catch (error) {
        this.logger.error(error);

        return originalSubscriptionPrice;
      }
    }

    // Final calculation
    const finalPrice =
      originalSubscriptionPrice -
      coupon.discountAmount;

    return Math.max(finalPrice, 0);
  }
}