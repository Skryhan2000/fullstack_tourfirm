import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { HotelServices } from 'src/app/shared/interfaces';
import { HotelServicesService } from 'src/app/shared/services/hotelservices.service';

@Component({
  selector: 'app-hotel-services-form',
  templateUrl: './hotel-services-form.component.html',
  styleUrls: ['./hotel-services-form.component.css']
})
export class HotelServicesFormComponent implements OnInit {

  hotelServices: HotelServices[]=[]
  hotelService:HotelServices
  hotelServiceId = null;
  form: FormGroup
  loading=false

  constructor(
    private hotelServicesService: HotelServicesService
  ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      nameHotelService:new FormControl(null, [Validators.required])
    })
    
    this.form.disable()
    this.loading=true
    this.hotelServicesService.fetch().subscribe(hotelServices=>{
      this.hotelServices=hotelServices    
      this.loading=false
      })        
      this.form.enable()
  }

  onSelectTransfer( hotelService: HotelServices){    
    this.hotelServiceId=hotelService._id         
    this.form.reset({
      nameHotelService: hotelService.nameHotelService
    })        
    MaterialService.updateTextInputs()    
  }

  onDeleteHotelService(event: Event, hotelService: HotelServices){
    event.stopPropagation();
    const decision = window.confirm(`Удалить услугу "${hotelService.nameHotelService}"?`);

    if (decision) {
      this.hotelServicesService.delete(hotelService).subscribe(
        (response) => {
          const idx = this.hotelServices.findIndex((p) => p._id === hotelService._id);
          this.hotelServices.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  onSubmit(){
    const newHotelService: HotelServices = {
      nameHotelService: this.form.value.nameHotelService
    }; 
    if (this.hotelServiceId) {
      newHotelService._id = this.hotelServiceId;
      this.hotelServiceId=null
      this.hotelServicesService.update(newHotelService).subscribe(
        (hotelService) => {
          const idx = this.hotelServices.findIndex((p) => p._id === hotelService._id);
          this.hotelServices[idx] = hotelService;
          MaterialService.toats('Изменения сохранены');
        },
        (error) => MaterialService.toats(error.error.message) ,
      ()=>{this.form.reset({
        nameHotelService: null
      })        
      MaterialService.updateTextInputs() 
    }      
      );
    } else {      
      this.hotelServicesService.create(newHotelService).subscribe(
        (hotelService) => {
          MaterialService.toats('Услга добавлен в систему');
          this.hotelServices.push(hotelService);
        },
        (error) => MaterialService.toats(error.error.message),
        ()=>{this.form.reset({
          nameHotelService: null
        })        
        MaterialService.updateTextInputs() 
      }
      );
    }
  }
}
