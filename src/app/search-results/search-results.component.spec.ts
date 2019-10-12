import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { HotelExplorerService } from '../app.service';
import { IHotel } from '../model';
const mockHotelList: IHotel[] = [
  {
    "id": "350298",
    name: "Novotel Paris Nord Expo Aulnay Hotel",
    rating: 4,
    hotelCurrencyCode: "EUR"
  }
];
const mockResponse = {
  hotels: [ {
    "id": "350298",
    name: "Novotel Paris Nord Expo Aulnay Hotel",
    rating: 4,
    hotelCurrencyCode: "EUR"
  }]
}
const hotelExplorerServiceStub = {
  getList: jasmine.createSpy('getList').and.returnValue(mockHotelList),
  setList: jasmine.createSpy('setList'),
  getHotelList: jasmine.createSpy('getHotelList').and.returnValue(mockResponse)
}
describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      providers: [ {
        provide: HotelExplorerService,
        useValue: hotelExplorerServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
