import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order, UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-history-page',
  templateUrl: './user-history-page.component.html',
  styleUrls: ['./user-history-page.component.css']
})
export class UserHistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  orders$: Observable<Order[]>
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectOrder:Order

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.orders$= this.orderService.getByStatus(true)
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
    this.modal.open()    
  }

}
