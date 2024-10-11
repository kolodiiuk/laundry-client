export interface Service {

    serviceId: number;
    name: string;
    category: ServiceCategory;
    desc: string;
    pricePerUnit: number;
    unitType: UnitType;
    isActive: boolean;
    lastUpdated: Date;
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
