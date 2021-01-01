import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order, UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-order-page',
  templateUrl: './user-order-page.component.html',
  styleUrls: ['./user-order-page.component.css']
})
export class UserOrderPageComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  pending=false
  form: FormGroup
  user: UserFull
  loading=false
  orders:   Order[]=[]
  orderUpdate: Order
  oSub: Subscription

  constructor( private orderService: OrderService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl([ Validators.email]),
      fullName:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*'), Validators.minLength(5)]),
      phone:new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      description: new FormControl()
    });
    this.userService.getById(this.authService.userIdByToken()).subscribe(
      user => {         
        this.user=user})

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
   // this.oSub.unsubscribe()
  }
  onCancel(){
    this.form.reset({
      fullName:null,
      email: null,
      description: null,
      phone: null
    })
    this.modal.close()
  }
  onSelectOrder(order: Order){   
    this.orderUpdate=order 
    this.form.reset({
      fullName:order.name,
      email: order.email,
      description: order.description,
      phone: order.phone
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeleteOrder(event: Event, order: Order){
    event.stopPropagation();
    const decision = window.confirm(`Удалить позицию "${order.order}"?`);

    if (decision) {
      this
      this.orderService.delete(order._id).subscribe(
        (response) => {
          const idx = this.orders.findIndex((p) => p._id === order._id);
          this.orders.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  onSubmit(){    
    this.pending=true    
    const newOrder: Order = {
      service: this.orderUpdate.service,      
      requestS: this.orderUpdate.requestS,            
        name:this.form.value.fullName,
        phone:this.form.value.phone,
       email:this.form.value.email,
       description:this.form.value.description,
       clientId:  this.orderUpdate.clientId
      
    };
    this.oSub=this.orderService.update(newOrder, this.orderUpdate._id).subscribe(
      (newOrder) => {
        const idx = this.orders.findIndex((p) => p._id === newOrder._id);
          this.orders[idx] = newOrder;
        MaterialService.toats(`Изменения сохранены`);        
      },
      (error) => MaterialService.toats(error.error.message),
      () => {
        this.modal.close();
        this.pending=false
      }
    );
}
}
