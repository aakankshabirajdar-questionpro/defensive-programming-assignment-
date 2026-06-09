export class Coupon {
  code!: string;
  discountAmount!: number;
  expiryDate!: Date;
  isThirdParty?: boolean;
}