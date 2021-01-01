import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Tour } from 'src/app/shared/interfaces';
import { TourService } from 'src/app/shared/services/tour.service';

@Component({
  selector: 'app-tour-order-page',
  templateUrl: './tour-order-page.component.html',
  styleUrls: ['./tour-order-page.component.css']
})
export class TourOrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  tours$: Observable<Tour[]>
  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  tour: Tour
  public _reload=true

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.tours$=  this.tourService.fetch(this.categoryId)
  }

 
  ngAfterViewInit(){      
    this.modal=MaterialService.initModal(this.modalRef) 
  }
  ngOnDestroy(){
    setTimeout(()=>this._reload=false)
    this.modal.destroy()       
  }
  onSelectTour(tour: Tour){
    setTimeout(()=>this._reload=true)
    this.tour=tour
  console.log(tour._id)
  this.modal.open()
}
onCancel(){
  this.modal.close()
  setTimeout(()=>this._reload=false)
}


}
