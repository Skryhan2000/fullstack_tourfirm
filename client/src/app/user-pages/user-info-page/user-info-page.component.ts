import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  form: FormGroup
  userId: string
  user: UserFull
  image: any


  constructor( private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      fullName:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*'), Validators.minLength(5)]),
      phone:new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });    
    this.userId=this.auth.userIdByToken()
    this.userService.getById(this.userId).subscribe(
      user => {         
        this.user=user
        this.form.patchValue({
          email:user.email,
          fullName:user.fullName,
          phone:user.phones          
        })        
        MaterialService.updateTextInputs()
        this.form.controls['password'].disable()
      },
      (error) => MaterialService.toats(error.error.message)
    );
  }
  
  deleteClient(){    
    const decision = window.confirm(`Удалить ваш аккаунт "${this.form.value.fullName}"?`);
    if (decision) {
      this.userService.delete(this.userId).subscribe(
        (response) => {         
          MaterialService.toats(response.message);

        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  onSubmit(){ 
    
    const newUser: UserFull = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,            
      phones: this.form.value.phone,
      status: "client"      
    };          
    
      newUser._id = this.userId;
      this.userService.update(newUser, this.image).subscribe(
        (user) => {          
          MaterialService.toats('Изменения сохранены');
        },
        (error) => MaterialService.toats(error.error.message),        
      );    
  }

}
