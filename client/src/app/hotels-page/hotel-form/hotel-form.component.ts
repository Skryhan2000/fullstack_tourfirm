import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Hotel, HotelService, HotelServices } from 'src/app/shared/interfaces';
import { HotelsService } from 'src/app/shared/services/hotel.service';
import { HotelServicesService } from 'src/app/shared/services/hotelservices.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  

  @ViewChild('input') inputRef: ElementRef
  @ViewChild('select') selectRef: ElementRef
  select: any
  form: FormGroup
  image:File
  imagePreview=''
  isNew=true
  hotel: Hotel
  loading=false
  hotelServicesCommon: HotelServices[]=[]
  hotelServiceCommon:HotelServices

  testic:HotelService[]=[]
  testicObj:HotelService
  
  
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelsService,
    private router: Router,
    private hotelServicesService: HotelServicesService
  ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl(null, [Validators.required]),
     // nameService:new FormControl(null, [Validators.required]),
      //costService:new FormControl(false),      
      text:new FormControl(null),
      phone:new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[0-9]*')]),
      site:new FormControl(null, [  Validators.minLength(5)]),
      stars: new FormControl(null, [Validators.required, Validators.min(0.01),Validators.max(5)]),
      contry:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*')]),
      town:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*')]),
      street:new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.min(1)]),
      corpus:new FormControl(null)
      ,
      "hotelServiceArray": new FormArray([
        new FormGroup( {
          typeServ: new FormControl(false),
        nameHotelService: new FormControl(),
        cost: new FormControl(false)        
      })
    ])
    })
    
    this.form.disable()
    this.loading=true
    this.hotelServicesService.fetch().subscribe(hotelServicesCommon=>{
      this.hotelServicesCommon=hotelServicesCommon  
      for(let idx=1;hotelServicesCommon.length!=idx;idx++){
        this.addHotelService()          
         }    
         this.form.patchValue({               
          hotelServiceArray:hotelServicesCommon
        })                  
        MaterialService.updateTextInputs()  
      this.loading=false
      })
    this.route.params
    .pipe(
      switchMap(
        (params: Params)=>{
          if(params['id']){
            this.isNew=false            
            return this.hotelService.getById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      hotel=>{
        if(hotel){
          this.hotel=hotel
          this.form.patchValue({
            name:hotel.name,
            text:hotel.text,
      site:hotel.site,      
      contry:hotel.address.contry,
      town:hotel.address.town,
      street:hotel.address.street,
      number:hotel.address.number,
      corpus:hotel.address.corpus,    
      phone:hotel.phoneList[0],      
      stars:hotel.stars,
      hotelServiceArray:hotel.hotelService
          })
          this.imagePreview=hotel.imagePaths[0]
          MaterialService.updateTextInputs()
        }
      },
      error=> MaterialService.toats(error.error.message)
      )
     
      this.form.enable()
  }
  

  ngAfterViewInit(){} 



  triggerClick(){
    this.inputRef.nativeElement.click()
  }
 
  get hotelServiceArray(): FormArray {
    return this.form.get('hotelServiceArray') as FormArray;
}
  addHotelService(){    
    this.hotelServiceArray.push(new FormGroup( {
      typeServ: new FormControl(false),
      nameHotelService: new FormControl(),
      cost: new FormControl(false)  
    }));     
  }

  deleteHotel(){
    const decision = window.confirm(`Вы уверены, что хотите удалить отель "${this.hotel.name}"`)
    if(decision){
      this.hotelService.delete(this.hotel._id)
      .subscribe(
        responce=>MaterialService.toats(responce.message),
        error=>MaterialService.toats(error.error.message),
        ()=> this.router.navigate(['/hotels'])
      )
    }
  }

  onFileUpload(event: any){
    const file=event.target.files[0]
    this.image=file
    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePreview=reader.result as string
    }
    reader.readAsDataURL(file)
  }

 

  onSubmit(){
    for(let idx=0;this.hotelServiceArray.length!=idx+1;idx++){      
      if(this.hotelServiceArray.at(idx).value.typeServ==true){                
        this.testicObj=this.hotelServiceArray.at(idx).value            
        this.testic.push(this.testicObj)                
      }      
       }       
    const newHotel: Hotel = {
      name:this.form.value.name,      
      text:this.form.value.text,
      site:this.form.value.site,
      address:{
      contry:this.form.value.contry,
      town:this.form.value.town,
      street:this.form.value.street,
      number:this.form.value.number,
      corpus:this.form.value.corpus
    },
    phoneList:this.form.value.phone,      
      stars:this.form.value.stars,
      hotelService: this.testic
      
                
    };
    let obs$
    this.form.disable()
    if(this.isNew){
     obs$= this.hotelService.create(newHotel, this.image)     
    }else{
      obs$=this.hotelService.update(this.hotel._id,newHotel, this.image)
    }
    obs$.subscribe(
      hotel=>{
        this.hotel=hotel
        this.isNew=false
        MaterialService.toats('Изменения сохранены.')
      },
      error=>{
        MaterialService.toats(error.error.message)        
      }
      )
    this.form.enable()
  }

}
