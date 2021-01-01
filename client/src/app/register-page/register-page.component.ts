import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';
//import {uiMask} from 'angular-ui-mask';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy  {

  form: FormGroup
  aSub: Subscription
  
  
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form= new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      fullName:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*'), Validators.minLength(5)]),
      phones:new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    })   
  }

  ngOnDestroy(){
    if(this.aSub)
    this.aSub.unsubscribe()
  }
  
  onSubmit(){
    this.form.disable()
   this.aSub =this.auth.register(this.form.value).subscribe(
      ()=>this.router.navigate(['/login'], {
        queryParams:{
          registered:true
        }
      }),
      error=>{
        MaterialService.toats(error.error.message)
        console.warn(error)
      this.form.enable()}
    )
  }

}
