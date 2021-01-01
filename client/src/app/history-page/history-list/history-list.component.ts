import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order, User, UserFull } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()orders: Order[]
  @Input() users: UserFull[]

  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  selectOrder:Order
  info=false

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {  }
  ngAfterViewInit(){   
    this.modal=MaterialService.initModal(this.modalRef) 
  }

  ngOnDestroy(){
    this.modal.destroy()    
  }

  onCancel(){
    this.modal.close()
  }

  onSelectOrder(order: Order){       
    this.selectOrder=order
    if(this.selectOrder.service.type=="Бронирование отеля" ||this.selectOrder.service.type=="Бронирование тура") this.info=true
    else this.info=false
    this.modal.open()    
  }
    
  onOpen(order: Order){
    if(this.selectOrder.service.type=="Бронирование отеля"){
      this.router.navigate(['/hotels',order.service.objectId])
    }
    else if(this.selectOrder.service.type=="Бронирование тура"){
      this.router.navigate(['/tour',order.service.objectId])
    }
  }

}
