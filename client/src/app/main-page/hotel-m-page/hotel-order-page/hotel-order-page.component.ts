import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Hotel } from 'src/app/shared/interfaces';
import { HotelsService } from 'src/app/shared/services/hotel.service';

@Component({
  selector: 'app-hotel-order-page',
  templateUrl: './hotel-order-page.component.html',
  styleUrls: ['./hotel-order-page.component.css']
})
export class HotelOrderPageComponent implements OnInit, AfterViewInit,OnDestroy {
  
  
  hotels$: Observable<Hotel[]>
  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  hotel: Hotel
  public _reload=true

  constructor(private hotelService: HotelsService) { }

  ngOnInit(): void {
    this.hotels$=  this.hotelService.fetch()
  }

  ngAfterViewInit(){      
    this.modal=MaterialService.initModal(this.modalRef) 
  }

  ngOnDestroy(){
    setTimeout(()=>this._reload=false)
    this.modal.destroy()       
  } 

  onSelectHotel(hotel: Hotel){
    setTimeout(()=>this._reload=true)
    this.hotel=hotel
  console.log(hotel._id)
  this.modal.open()
}
onCancel(){
  setTimeout(()=>this._reload=false)
  this.modal.close()  
}
onSubmit(){    }

}
