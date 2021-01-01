import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Hotel } from '../shared/interfaces';
import { HotelsService } from '../shared/services/hotel.service';

@Component({
  selector: 'app-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.css']
})
export class HotelsPageComponent implements OnInit {

  hotels$: Observable<Hotel[]>
  

  constructor(private hotelService: HotelsService) { }

  ngOnInit(): void {
    this.hotels$=this.hotelService.fetch()
  

  }

}
