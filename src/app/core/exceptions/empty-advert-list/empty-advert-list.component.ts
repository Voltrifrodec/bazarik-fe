import { Component } from '@angular/core';
import { faExclamationTriangle, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empty-advert-list',
  templateUrl: './empty-advert-list.component.html',
  styleUrls: ['./empty-advert-list.component.css']
})
export class EmptyAdvertListComponent {
    faExclamationTriangle = faExclamationTriangle;
    faPlus = faPlus;
    faHome = faHome
}
