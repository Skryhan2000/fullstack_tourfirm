import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Schedule } from 'src/app/shared/interfaces';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-schedule-tour',
  templateUrl: './schedule-tour.component.html',
  styleUrls: ['./schedule-tour.component.css']
})
export class ScheduleTourComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('tourId') tourId: string
  @ViewChild('modal') modalRef: ElementRef
//  @ViewChild('floating') floatingRef: ElementRef
  loading=false
  modal: MaterialInstance
  schedules: Schedule[]=[]
  schedule: Schedule
  form: FormGroup
  scheduleId:string
  

  constructor(private scheduleService: ScheduleService) {
   
   }

  ngOnInit(): void {
    this.form=new FormGroup({
      name: new FormControl (null, Validators.required),
      contries: new FormControl (null,Validators.pattern('[a-zA-Zа-яА-Я ]*')),
      hotels: new FormControl (null),
      "daysArray": new FormArray([
        new FormGroup( {
        date: new FormControl('',Validators.required),
        time: new FormControl('',Validators.required),
        action:  new FormControl('',Validators.required),
        cost: new FormControl('',Validators.required)
      })
     ])
    })
    
    this.loading=true
    this.scheduleService.fetch(this.tourId).subscribe(
      schedules=>{
        this.schedules=schedules
        this.loading=false
      },
      error=> MaterialService.toats(error.error.message)
    )
   
    
  

  }

  ngOnDestroy(){
    this.modal.destroy()
  }

  ngAfterViewInit(){
    this.modal=MaterialService.initModal(this.modalRef)
    
  //  MaterialService.initializeFloatingButton(this.floatingRef)
  }

  onSelectSchedule(schedule: Schedule){    
   for(let idx=1;schedule.days.length!=idx;idx++){
     this.addDay()          
      }      
    this.scheduleId=schedule._id
    this.form.patchValue({
      name:schedule.name,
      contries:schedule.contries,
      hotels:schedule.hotels,      
      daysArray:schedule.days
    })  
    this.modal.open()
    MaterialService.updateTextInputs()    
  }

  onAddSchedule(){
    this.scheduleId=null
    this.form.reset({
      name:null,
      contries:null,
      hotels:null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }
  onDeleteSchedule(event:Event,schedule: Schedule){
    event.stopPropagation()
    const decision=window.confirm(`Удалить программу "${schedule.name}"?`);
    if (decision) {
      this.scheduleService.delete(schedule).subscribe(
        (response) => {
          const idx = this.schedules.findIndex((p) => p._id === schedule._id);
          this.schedules.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }


  get daysArray(): FormArray {
    return this.form.get('daysArray') as FormArray;
}
  addDay(){    
    this.daysArray.push(new FormGroup( {
      date: new FormControl('',Validators.required),
      time: new FormControl('',Validators.required),
      action:  new FormControl('',Validators.required),
      cost: new FormControl('',Validators.required)
    }));     
  }
  

  deleteDay(index:number){
    if (this.daysArray.length !== 1) { 
      this.daysArray.removeAt(index); 
    }
  }

  // copyDay(index:number){
  //   this.addDay()
  //   this.daysArray[this.daysArray.length-1]=this.daysArray[index] 
  //   this.form.patchValue({            
  //     daysArray:this.daysArray
  //   })  
  //   MaterialService.updateTextInputs()
  // }

  onCancel(){
    this.modal.close()
    for(let idx=this.daysArray.length-1;this.daysArray.length>1;idx--){
    this.deleteDay(idx)
    }
    this.form.reset({
      name:null,
      contries:null,
      hotels:null   
    })    
    MaterialService.updateTextInputs()
  }

  onSubmit(){    
    this.form.disable()
    const newSchedule: Schedule={
       name: this.form.value.name,
       contries:this.form.value.contries,
       hotels: this.form.value.hotels,
       days:this.form.value.daysArray,      
       tour:this.tourId
    }    
    const complited=()=>{
      this.modal.close()
      for(let idx=this.daysArray.length-1;this.daysArray.length>1;idx--){
        this.deleteDay(idx)
        }
      this.form.reset({name:'',contries:'',hotels:'',daysArray:''})      
      this.form.enable()
    }
    if(this.scheduleId){
      newSchedule._id=this.scheduleId
      this.scheduleService.update(newSchedule).subscribe(
        schedule=>{
          const idx=this.schedules.findIndex(p=>p._id===schedule._id)
          this.schedules[idx]=schedule
          MaterialService.toats('Изменения сохраненны')                    
        },
        error=> MaterialService.toats(error.error.message),
        complited       
      )
    }
    else{
      this.scheduleService.create(newSchedule).subscribe(
        schedule=>{
          MaterialService.toats('Программа создана')
          this.schedules.push(schedule)
        },
        error=> MaterialService.toats(error.error.message),
         complited       
      )
    }
    }
  
  }
