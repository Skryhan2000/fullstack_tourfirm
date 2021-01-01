import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import {  UserFull } from '../shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {


 users: UserFull[]=[]
 @ViewChild('select') selectRef: ElementRef
 @ViewChild('modal') modalRef: ElementRef 
 loading=false
 modal: MaterialInstance
 user: UserFull
 userId = null;
 form: FormGroup
 select: any
 @ViewChild('input') inputRef: ElementRef
 image:File
 imagePreview='' 
 passwordSave:string

  constructor(    
    private userService: UserService) { }

  ngOnInit(): void { 
    this.form = new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      fullName:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*'), Validators.minLength(5)]),
      phone:new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
     
  this.loading=true
  this.userService.fetch().subscribe(users=>{
    this.users=users
    this.loading=false
    })  
    
  }
  ngOnDestroy(){
    this.modal.destroy()
  }

  ngAfterViewInit(){
    this.modal=MaterialService.initModal(this.modalRef)   
    MaterialService.initSelect(this.selectRef)
    this.select= MaterialService.getSelectElemet(this.selectRef)
  }

  onDeleteEmployee(event: Event, user: UserFull){
    event.stopPropagation();
    const decision = window.confirm(`Удалить позицию "${user.fullName}"?`);

    if (decision) {
      this.userService.delete(user._id).subscribe(
        (response) => {
          const idx = this.users.findIndex((p) => p._id === user._id);
          this.users.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  onAddEmployee(){
    this.userId=null
    this.form.reset({
      fullName: null,
      email: null,
      password: null,
      phone: null
    })
    this.imagePreview=null
    this.modal.open()
    MaterialService.updateTextInputs()
    this.form.controls['password'].enable();
  }
  onSelectEmployee(user: UserFull){    
    this.userId=user._id         
    this.form.reset({
      fullName: user.fullName,
      email: user.email,
    password: user.password,
      phone: user.phones
    })        
    this.imagePreview=user.imagePath
    this.modal.open()
    MaterialService.updateTextInputs()
    this.form.controls['password'].disable();
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
  }

  onSubmit(){ 
    
    const newUser: UserFull = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,      
      password: this.form.value.password,
      phones: this.form.value.phone,
      status:this.select.getSelectedValues()            
    };
    
    const complited = () => {
      this.modal.close();
      this.form.reset({ fullName: null,
        email: null,
        password: null,
        phone: null });
      this.form.enable();
    };    
    if (this.userId) {
      newUser._id = this.userId;
      this.userService.update(newUser, this.image).subscribe(
        (user) => {
          const idx = this.users.findIndex((p) => p._id === user._id);
          this.users[idx] = user;
          MaterialService.toats('Изменения сохранены');
        },
        (error) => MaterialService.toats(error.error.message),
        complited
      );
    } else {      
      this.userService.create(newUser
        //newUser.fullName, newUser.email, newUser.password,newUser.phones,
      //  newUser.status
        //
        , this.image).subscribe(
        (user) => {
          MaterialService.toats('Сотрудник добавлен в систему');
          this.users.push(user);
        },
        (error) => MaterialService.toats(error.error.message),
        complited
      );
    }
  }
  }



