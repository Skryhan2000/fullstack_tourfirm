import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance } from 'src/app/shared/classes/material.service';
import { UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-credit-m-page',
  templateUrl: './credit-m-page.component.html',
  styleUrls: ['./credit-m-page.component.css']
})
export class CreditMPageComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {   
  }

}
