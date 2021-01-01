import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Order } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  orders$:Observable<Order[]>
  selectOrder:Order  
  orders:   Order[]=[]
  loading=false
  pending=false
  info=false
  
  constructor(private orderService: OrderService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading=true
    this.orderService.getByStatus(false).subscribe(orders=>{
      this.orders=orders
      this.loading=false
      })  
  }
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

  onSubmit(){ 
    this.pending=true
    const newOrder: Order = {
      service: this.selectOrder.service,      
      requestS: true,            
      name:this.selectOrder.name,
      phone:this.selectOrder.phone,
      email:this.selectOrder.email,      
      user:this.auth.userIdByToken()      
    };
    this.orderService.update(newOrder, this.selectOrder._id).subscribe(
      (newOrder) => {        
        const idx = this.orders.findIndex((p) => p._id === newOrder._id);
        this.orders.splice(idx)
        MaterialService.toats(`Заявка ${newOrder.order} обработана`);        
      },
      (error) => MaterialService.toats(error.error.message),
      () => {
        this.modal.close();
        this.pending=false
      }
    );
   }
}
