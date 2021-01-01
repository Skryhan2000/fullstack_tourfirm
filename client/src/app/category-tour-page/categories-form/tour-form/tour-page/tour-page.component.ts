import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialDatepicker,  MaterialService } from 'src/app/shared/classes/material.service';
import { Tour } from 'src/app/shared/interfaces';
import { TourService } from 'src/app/shared/services/tour.service';


@Component({
  selector: 'app-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css']
})
export class TourPageComponent implements OnInit, AfterViewInit {

  @ViewChild('input') inputRef: ElementRef
  @ViewChild('select') selectRef: ElementRef
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  

  form: FormGroup  
  categoryId: string  
  tourId: string  
  isNew=true  
  start: MaterialDatepicker
  end: MaterialDatepicker
  isValid=true  
  image:File
  imagePreview=''  
  tour: Tour  
  tour1: Observable<Tour>  
  select: any
  test: any
  

  constructor(    
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.form=new FormGroup({
      name:new FormControl(null, [Validators.required]),
      contry:new FormControl(null, [Validators.required]),
      cost:new FormControl(null, [Validators.required]),
      insallmentPlan:new FormControl(true),      
      description:new FormControl(null),
      places:new FormControl(null, [Validators.required])      
    })

    this.form.disable()

    this.route.params
    .pipe(
      switchMap(
        (params: Params)=>{
          if(params['id']){           
            if(this.router.url.toString().indexOf('new')!=-1){
            this.isNew=true
            this.categoryId=params['id'] as string            
            return of(null)   
            } else{
              this.isNew=false    
              this.tourId=params['id'] as string                     
            return this.tourService.getById(params['id'])
            }                   
          }
          
        }
      )
    ).subscribe(
      tour=>{
        if(tour){          
          this.tour=tour
          this.form.patchValue({
            name:tour.name,
            contry:tour.contry,
            cost:tour.cost,
            description:tour.description,           
            places: tour.datePlaces.freePlaces,
            insallmentPlan: tour.insallmentPlan            
          })                    
          this.imagePreview=tour.imagePaths[0]
          this.categoryId=tour.categoryTour
          MaterialService.updateTextInputs()
        }
      },
      error=> MaterialService.toats(error.error.message)
    )
    
    
    this.form.enable()
  
  
  }

  ngAfterViewInit(){       
    MaterialService.initSelect(this.selectRef)
   this.select= MaterialService.getSelectElemet(this.selectRef)
    this.start=   MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end=   MaterialService.initDatepicker(this.endRef, this.validate.bind(this))    
  }

 
 
  
  validate(){
    
    if(!this.start.date|| !this.end.date){
      this.isValid=true
      return }
    this.isValid=this.start.date<=this.end.date    
      }
    
  triggerClick(){
    this.inputRef.nativeElement.click()
  }
  

  deleteTour(){
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.tour.name}"`)
    if(decision){
     this.tourService.delete(this.tour._id)
      .subscribe(
        responce=>MaterialService.toats(responce.message),
        error=>MaterialService.toats(error.error.message),
        ()=> this.router.navigate(['/categoriesTour/:id', this.categoryId])
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
    let obs$
    this.form.disable()
    if(this.isNew){
     
    obs$= this.tourService.create(this.categoryId, this.form.value.name,this.form.value.contry, this.form.value.cost,this.start.date,
      this.end.date, this.form.value.places,this.form.value.insallmentPlan,this.select.getSelectedValues(),this.form.value.description, this.image)
    }else{
      obs$=this.tourService.update(this.tour._id,this.categoryId, this.form.value.name, this.form.value.contry, this.form.value.cost,this.start.date,
      this.end.date, this.form.value.places,this.form.value.insallmentPlan,this.select.getSelectedValues(),this.form.value.description, this.image)
    }
    obs$.subscribe(
      tour=>{
        this.tour=tour
        MaterialService.toats('Изменения сохранены.')
      },
      error=>{
        MaterialService.toats(error.error.message)        
      }
      )
    this.form.enable()
  }

}
