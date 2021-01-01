import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order, Transfer, UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { TransferService } from 'src/app/shared/services/transfer.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-transfer-m-page',
  templateUrl: './transfer-m-page.component.html',
  styleUrls: ['./transfer-m-page.component.css']
})
export class TransferMPageComponent implements OnInit, AfterViewInit {

  @ViewChild('section') sectionRef: ElementRef
  transfer$: Observable<Transfer[]>
 
  

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
 
    this.transfer$=  this.transferService.fetch()
  
  }

  ngAfterViewInit(){
    MaterialService.initSection(this.sectionRef)
  
  }
 

}
