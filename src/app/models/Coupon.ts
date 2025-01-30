export interface Coupon {
    id: number;
    code: string;
    percentage: number;
    startDate: Date;
    endDate: Date;
    usedCount: number;
    serviceIds: number[];
}

export interface CreateCouponDto extends Omit<Coupon, 'id'> {
    serviceIds: number[];
}

export interface UpdateCouponDto extends Coupon {}
