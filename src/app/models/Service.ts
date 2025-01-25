export interface Service {
    id: number;
    name: string;
    category: ServiceCategory;
    description: string;
    pricePerUnit: number;
    unitType: UnitType;
    isAvailable: boolean;
}

export enum ServiceCategory {
    Washing, 
    DryCleaning, 
    Ironing, 
    AddOn 
}

export enum UnitType { 
    Piece, 
    Kg, 
    SquareMeters, 
    Load, 
    Pair 
}
