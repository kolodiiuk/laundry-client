export interface Coupon {

    code: string;
    percentage: number;
    startDate: Date;
    endDate: Date;
    usedCount: number;
}