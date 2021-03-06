import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { HotelExplorerService } from '../app.service';
import { NgbdDatepickerPopup } from '../ngbd-datepicker-popup/ngbd-datepicker-popup.component';
import { FormsModule } from '@angular/forms';
import { IHotel } from '../model';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
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
describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent, NgbdDatepickerPopup],
       providers: [ {
        provide: HotelExplorerService,
        useValue: hotelExplorerServiceStub
      }],
      imports: [FormsModule, NgbModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
