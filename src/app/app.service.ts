import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IInitSession, IResult, IRequestValues } from './model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
const httpOptions = {
	headers: new HttpHeaders({
		'oski-tenantId': 'Demo',
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class HotelExplorerService {
sessionId: string;
status: string;
data: any;
pgNumber: number = 1;
hotelList = new Subject();
	constructor(private http: HttpClient) { }

	initaliseSession(requestValues: IRequestValues): Observable<IInitSession> {
		return this.http.post<any>('https://public-be.oski.io/hotel/v1.0/search/init', {
			"currency": "USD",
			"posId": "hbg3h7rf28",
			"orderBy": "price asc, rating desc",
			"roomOccupancies": [
				{
					"occupants": [
						{
							"type": "Adult",
							"age": 25
						}
					]
				}
			],
			"stayPeriod": {
				"start": requestValues.checkinDate,
				"end": requestValues.checkOutDate
			},
			"bounds": {
				"circle": {
					"center": {
						"lat": requestValues.destinationLatitude,
						"long": requestValues.destinationLongitude
					},
					"radiusKm": 50.5
				}
			}
		}, httpOptions)
	}

	getStatus(sessionId: string) {
		return this.http.post<any>('https://public-be.oski.io/hotel/v1.0/search/status', { sessionId }, httpOptions)
	}

	getHotelList(sessionId: string, pageNo = 1): Observable<IResult> {
		return this.http.post<any>('https://public-be.oski.io/hotel/v1.0/search/results', {
			"sessionId": sessionId,
			"paging": {
				"pageNo": pageNo,
				"pageSize": 10,
				"orderBy": "price asc, rating desc"
			},
			"optionalDataPrefs": [
				"All"
			],
			"currency": "USD",
			"contentPrefs": [
				"Basic",
				"Activities",
				"Amenities",
				"Policies",
				"AreaAttractions",
				"Descriptions",
				"Images",
				"CheckinCheckoutPolicy",
				"All"
			],
			"filters": {
				"minHotelPrice": 1,
				"maxHotelPrice": 10000,
				"minHotelRating": 1,
				"maxHotelRating": 5,
				"hotelChains": [
					"Novotel",
					"Marriott",
					"Hilton",
					"Accor"
				],
				"allowedCountry": "FR"
			}
		}
			, httpOptions)
	}

	setList(data) {
		this.data = data;
		this.hotelList.next(data);
	}
	getList() {
		return this.data;
	}
	setSessionId(sessionId) {
		this.sessionId = sessionId;
	}
	getSessionId() {
		return this.sessionId;
	}
	incrementPageNo() {
		this.pgNumber++;
	}
	getPageNo() {
		return this.pgNumber;
	}
}