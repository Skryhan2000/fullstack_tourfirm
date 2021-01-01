import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CategoryTour } from 'src/app/shared/interfaces';
import { CategoryTourService } from 'src/app/shared/services/categoryTour.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  image:File
  imagePreview=''
  isNew=true
  categoryTour: CategoryTour

  constructor(private route: ActivatedRoute,
    private categoriesTourService: CategoryTourService,
    private router: Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl(null, [Validators.required])
    })
    
    this.form.disable()

    this.route.params
    .pipe(
      switchMap(
        (params: Params)=>{
          if(params['id']){
            this.isNew=false
            return this.categoriesTourService.getById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      categoryTour=>{
        if(categoryTour){
          this.categoryTour=categoryTour
          this.form.patchValue({
            name:categoryTour.name
          })
          this.imagePreview=categoryTour.imagePath
          MaterialService.updateTextInputs()
        }
      },
      error=> MaterialService.toats(error.error.message)
      )
      
      this.form.enable()
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  deleteCategory(){
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.categoryTour.name}"`)
    if(decision){
      this.categoriesTourService.delete(this.categoryTour._id)
      .subscribe(
        responce=>MaterialService.toats(responce.message),
        error=>MaterialService.toats(error.error.message),
        ()=> this.router.navigate(['/categoriesTour'])
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
     obs$= this.categoriesTourService.create(this.form.value.name, this.image)    
    }else{
      obs$=this.categoriesTourService.update(this.categoryTour._id,this.form.value.name, this.image)
    }
    obs$.subscribe(
      categoryTour=>{
        this.categoryTour=categoryTour
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
