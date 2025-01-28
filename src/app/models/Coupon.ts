export interface Coupon {
    id: number;
    code: string;
    percentage: number;
    startDate: Date;
    endDate: Date;
    usedCount: number;
    serviceIds: number[]; // Added for M:M relationship
}

export interface CreateCouponDto extends Omit<Coupon, 'id' | 'usedCount'> {
    serviceIds: number[];
}

export interface UpdateCouponDto extends Coupon {}
