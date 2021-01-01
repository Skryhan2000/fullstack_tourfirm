import { Component, Input, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Tour } from 'src/app/shared/interfaces';
import { TourService } from 'src/app/shared/services/tour.service';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnInit {

@Input('categoryId') categoryId: string 
tours:Tour[]=[]
loading=false

  constructor(private tourService: TourService) { }

  ngOnInit(): void {    
    this.loading=true
    this.tourService.fetch(this.categoryId).subscribe(tours=>{
      this.tours=tours
      this.loading=false
    })
    
  }

  onDeletePosition(event: Event, tour: Tour) {
    event.stopPropagation();
    const decision = window.confirm(`Удалить позицию "${tour.name}"?`);

    if (decision) {
      this.tourService.delete(tour._id).subscribe(
        (response) => {
          const idx = this.tours.findIndex((p) => p._id === tour._id);
          this.tours.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  

}
