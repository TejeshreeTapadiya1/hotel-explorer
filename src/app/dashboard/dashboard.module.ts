import { NgModule } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { DashboardComponent } from './dashboard.component';
import { NgbdDatepickerPopup } from '../ngbd-datepicker-popup/ngbd-datepicker-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from '../search-results/search-results.component';
const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'search-form', component: SearchFormComponent}, 
    { path: 'search-results', component: SearchResultsComponent}
];
@NgModule({
    imports: [ RouterModule.forChild(routes), NgbModule, FormsModule, 
        CommonModule ],
    declarations: [ DashboardComponent, SearchFormComponent, NgbdDatepickerPopup, SearchResultsComponent ],
})
export class DashboardModule { }