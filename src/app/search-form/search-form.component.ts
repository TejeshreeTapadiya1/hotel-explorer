import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotelExplorerService } from '../app.service';
import { NgbdDatepickerPopup } from '../ngbd-datepicker-popup/ngbd-datepicker-popup.component';
import { IRequestValues, IInitSession } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @ViewChild('checkinDatePicker') checkinDatePicker: NgbdDatepickerPopup;
  @ViewChild('checkOutDatePicker') checkOutDatePicker: NgbdDatepickerPopup;
  sessionId: string;
  status: string;
  message: string;
  loading: boolean = false;

  constructor(private service: HotelExplorerService, private router: Router) { }

  searchHotels(form: NgForm) {
    const requestValues: IRequestValues = {
      destinationLatitude: parseFloat(form.value.destinationLatitude),
      destinationLongitude: parseFloat(form.value.destinationLongitude),
      guestNumber: form.value.guestNumber,
      checkinDate: `${this.checkinDatePicker.model.month}/${this.checkinDatePicker.model.day}/${this.checkinDatePicker.model.year}`,
      checkOutDate: `${this.checkOutDatePicker.model.month}/${this.checkOutDatePicker.model.day}/${this.checkOutDatePicker.model.year}`
    }
    this.service.initaliseSession(requestValues).subscribe((data: IInitSession) => {
      this.loading = true;
      this.sessionId = data.sessionId;
      this.service.setSessionId(this.sessionId);
      this.service.getStatus(this.sessionId).subscribe(data => {
        this.status = data.status;
        this.checkCompleteStatus(this.status);
      })		
		});
    
  }
  checkCompleteStatus(status: string) {
    if (status==='Complete') {
      this.service.getHotelList(this.sessionId).subscribe((data) => {
        this.service.setList(data.hotels);
        this.loading = false;
        this.router.navigateByUrl('dashboard/search-results');
      },(error) => {
        this.message = error.error.message
      })
    } else {
      this.service.getStatus(this.sessionId).subscribe(data => {
        this.status = data.status;
        this.checkCompleteStatus(this.status);
      })		
    }
    
  }

}
