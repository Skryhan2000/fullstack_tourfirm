import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Room } from 'src/app/shared/interfaces';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements OnInit {

  @Input('hotelId') hotelId: string
  @ViewChild('select') selectRef: ElementRef
  select: any
  @ViewChild('input') inputRef: ElementRef
  image:File
  imagePreview='' 
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  loading=false  
  rooms: Room[]=[]
  room: Room
  roomId:string
  form: FormGroup

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      number: new FormControl (null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      single: new FormControl(0, Validators.min(0)),
      double: new FormControl(0,Validators.min(0)),
      baby: new FormControl(0, Validators.min(0)),            
      
    //   contries: new FormControl (null,Validators.pattern('[a-zA-Zа-яА-Я ]*')),
    //   hotels: new FormControl (null),
      "timeArray": new FormArray([
        new FormGroup( {
          dateTo: new FormControl(''),
          dateFrom: new FormControl(''),
          statusR:  new FormControl('false')        
      })
     ])
    })
    this.loading=true
    this.roomService.fetch(this.hotelId).subscribe(
      rooms=>{
        this.rooms=rooms
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
    MaterialService.initSelect(this.selectRef)
    this.select= MaterialService.getSelectElemet(this.selectRef)
  }
  get timeArray(): FormArray {
    return this.form.get('timeArray') as FormArray;
}
addMoment(){    
    this.timeArray.push( new FormGroup( {
      dateTo: new FormControl(''),
      dateFrom: new FormControl(''),
      statusR:  new FormControl('true')        
  }));     
  }
  

  deleteMoment(index:number){
    if (this.timeArray.length !== 1) { 
      this.timeArray.removeAt(index); 
    }
  }
  onAddRoom(){
    this.roomId=null
    this.form.reset({
      number:null,
      cost:null,
      single:null,
      double:null,
      baby:null      
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }
  onSelectRoom(room: Room){
    for(let idx=1;room.time.length!=idx;idx++){
      this.addMoment()          
       }  
    this.roomId=room._id
    this.form.reset({
      number:room.number,
      cost:room.cost,
      single:room.berth[0],
      double:room.berth[1],
      baby:room.berth[2],
      timeArray:room.time      
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }
  onDeleteRoom(event:Event,room: Room){
    event.stopPropagation()
    const decision=window.confirm(`Удалить комнату "${room.number}"?`);
    if (decision) {
      this.roomService.delete(room).subscribe(
        (response) => {
          const idx = this.rooms.findIndex((p) => p._id === room._id);
          this.rooms.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }
  triggerClick(){
    this.inputRef.nativeElement.click()
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

  onCancel(){
    this.modal.close()  
    for(let idx=this.timeArray.length-1;this.timeArray.length>1;idx--){
      this.deleteMoment(idx)
      }
      this.form.reset({
        number:null,
        cost:null,
        single:null,
        double:null,
        baby:null       
      })    
      MaterialService.updateTextInputs() 
  }

  onSubmit(){    
    this.form.disable()
    var beds=[this.form.value.single,this.form.value.double,this.form.value.baby]  
    const newRoom: Room={    
      number: this.form.value.number,
      cost:this.form.value.cost,
      type:this.select.getSelectedValues(),
       berth: beds,
       time:this.form.value.timeArray,      
       hotel:this.hotelId
    }        
    const complited=()=>{
      this.modal.close()
      for(let idx=this.timeArray.length-1;this.timeArray.length>1;idx--){
        this.deleteMoment(idx)
        }
      this.form.reset({number:'', cost:'', single:'', double:'', baby:'',daysArray:''})      
      this.form.enable()
    }
    if(this.roomId){
      newRoom._id=this.roomId
      this.roomService.update(newRoom).subscribe(
        schedule=>{
          const idx=this.rooms.findIndex(p=>p._id===schedule._id)
          this.rooms[idx]=schedule
          MaterialService.toats('Изменения сохраненны')                    
        },
        error=> MaterialService.toats(error.error.message),
        complited       
      )
    }
    else{
      this.roomService.create(newRoom).subscribe(
        schedule=>{
          MaterialService.toats('Комната создана')
          this.rooms.push(schedule)
        },
        error=> MaterialService.toats(error.error.message),
         complited       
      )
    }
    }

}
