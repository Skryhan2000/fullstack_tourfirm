import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialDatepicker, MaterialService } from '../shared/classes/material.service';
import { FilterTour, Tour } from '../shared/interfaces';
import { TourService } from '../shared/services/tour.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnDestroy, AfterViewInit {

  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef

  start: MaterialDatepicker
  end: MaterialDatepicker
  contry: string
  onFilter:any
  isValid=true

  tours: Tour[]=[]
  filter: FilterTour={}
  reloading=false  

  constructor(private tourService: TourService) { }

  ngOnDestroy(){
    this.start.destroy()
    this.end.destroy()
  }
  
  ngAfterViewInit(){
  this.start=   MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
  this.end=   MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }

  validate(){
    if(!this.start.date|| !this.end.date){
    this.isValid=true
    return
    }
    this.isValid=this.start.date<=this.end.date
    
    }

  private find(contry: string){        
    this.tourService.find(contry).subscribe(tours=>{            
       this.tours=this.tours.concat(tours)              
       this.reloading=false       
    },
    (error) => MaterialService.toats(error.error.message))   
  }

  applyFilter(filter: FilterTour){    
    this.filter=filter
    this.reloading=true
    //this.find()
  }


  submitFilter(){    
    if(this.contry){
      this.filter.contry= this.contry
    }
    if(this.start.date){
      this.filter.start=this.start.date
    }
    if(this.end.date){
      this.filter.end=this.end.date
    }
    this.reloading=true
    this.find(this.filter.contry)
  }
  

}
