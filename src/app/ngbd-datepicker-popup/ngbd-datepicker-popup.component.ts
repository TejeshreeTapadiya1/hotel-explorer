import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './ngbd-datepicker-popup.component.html',
  styleUrls: ['./ngbd-datepicker-popup.component.scss']
})
export class NgbdDatepickerPopup {
  model: IDateSelected;
}