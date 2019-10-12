import { Component, OnInit } from '@angular/core';
import { HotelExplorerService } from '../app.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
hotelList: [];
message: string;
  
  constructor(private service: HotelExplorerService) {
   }

  ngOnInit() {
    this.hotelList = this.service.getList();
  }

  showMoreHotels() {
    this.service.incrementPageNo();
    const sessionId = this.service.getSessionId();
    const pageNo = this.service.getPageNo();
    this.service.getHotelList(sessionId, pageNo).subscribe(data => {
      this.service.setList(data.hotels);
      this.hotelList = this.service.getList();
      this.message ='';
    }, error => {
      this.message = 'There are no search results found or all the search results are filtered out.'
    })
  }
}
