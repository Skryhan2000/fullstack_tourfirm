import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/shared/interfaces';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-schedule-order-page',
  templateUrl: './schedule-order-page.component.html',
  styleUrls: ['./schedule-order-page.component.css']
})
export class ScheduleOrderPageComponent implements OnInit {

  @Input('tourId') tourId : string
  scheduleis$: Observable<Schedule[]>

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleis$=  this.scheduleService.fetch(this.tourId)
  }

}
