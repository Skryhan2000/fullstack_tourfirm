import { Component, Input, OnInit } from '@angular/core';
import { Tour } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input()tours: Tour[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
