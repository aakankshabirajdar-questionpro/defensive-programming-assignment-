# Defensive Programming Assignment - Billing Module


## Functional Requirements Implemented

* Validate user input
* Validate coupon input
* Validate subscription price
* Validate discount amount (1 - 1000)
* Check coupon assignment to user
* Check coupon expiry
* Verify third-party coupons using external API
* Handle external API failures gracefully
* Prevent negative final prices

---


## Application Flow

Client Request
      |
      v
BillingController
      |
      v
PricingService
      |
      +--> User Validation
      |
      +--> Coupon Validation
      |
      +--> Price Validation
      |
      +--> Discount Validation
      |
      +--> Coupon Assignment Check
      |
      +--> Expiry Check
      |
      +--> Third-Party Verification
      |
      v
Final Price Calculation
    |
    v
Response

---

## Third-Party Coupon Verification Flow

Third Party Coupon?
      |
      YES
      |
      v
      Call Vendor API
      |
      v
      Coupon Valid?
            | 
        NO     YES
        |       |
        v       v
Return Original Price Apply Discount

---

## Sample Request

POST /billing/apply-discount

```json
{
  "user": {
    "id": "1",
    "assignedCouponCodes": ["SAVE100"]
  },
  "coupon": {
    "code": "SAVE100",
    "discountAmount": 100,
    "expiryDate": "2026-12-31",
    "isThirdParty": false
  },
  "originalSubscriptionPrice": 1000
}
```

Sample Response

```json
{
  "finalPrice": 900
}
```

---


## Test Coverage

The following scenarios are covered by unit tests:

* Null user
* Null coupon
* Negative price
* Invalid discount amount
* Coupon not assigned
* Expired coupon
* Successful discount
* Third-party coupon valid
* Third-party coupon invalid
* Vendor API failure
* Negative final price prevention

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run start:dev
```

Run unit tests:

```bash
npm run test
```

Generate coverage report:

```bash
npm run test:cov
```

---

## Author

Aakanksha Birajdar
