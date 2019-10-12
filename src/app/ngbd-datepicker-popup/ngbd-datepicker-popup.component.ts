import {Component, Output, EventEmitter} from '@angular/core';
import { IDateSelected } from '../model';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './ngbd-datepicker-popup.component.html',
  styleUrls: ['./ngbd-datepicker-popup.component.scss']
})
export class NgbdDatepickerPopup {
  model: IDateSelected;
}