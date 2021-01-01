import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/shared/interfaces';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-room-order-page',
  templateUrl: './room-order-page.component.html',
  styleUrls: ['./room-order-page.component.css']
})
export class RoomOrderPageComponent implements OnInit {

  @Input('hotelId') hotelId: string
  rooms$: Observable<Room[]>

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {         
    this.rooms$=  this.roomService.fetch(this.hotelId)
  }


}
