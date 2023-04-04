import { Component } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    fa = fa;

    math = Array(150).map((num, i) => num[i] = Math.round(Math.random()));
}
