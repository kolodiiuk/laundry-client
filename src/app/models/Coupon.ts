export interface Coupon {
  id: number;
  code: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
  usedCount: number;
}