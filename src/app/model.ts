export interface IInitSession {
    sessionId: string;
}

export interface IResult {
    currency: string;
    hotels: IHotel[];
    paging:IPaging;
    sessionId: string;
}

export interface IPaging {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
}

export interface IHotel {
    name: string;
    rating: number;
    id: string;
    hotelCurrencyCode: string;
}

export interface IDateSelected {
    year: number;
    month: number;
    day: number;
}

export interface IRequestValues {
    destinationLatitude: number;
    destinationLongitude: number;
    guestNumber: number;
    checkinDate: string;
    checkOutDate: string;
}