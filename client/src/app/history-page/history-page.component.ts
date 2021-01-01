import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Order, Filter, UserFull  } from '../shared/interfaces';
import { OrderService } from '../shared/services/order.service';
import { UserService } from '../shared/services/user.service';

const STEP=2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  isFilterVisible=false
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  orders: Order[]=[]
  filter: Filter={}

  loading=false
  reloading=false
  noMoreOrders=false
  users: UserFull[]=[]


  offset=0
  limit=STEP

  constructor(private ordersService: OrderService
    ,  private userService: UserService
    ) { }

  ngOnInit(): void {
    this.reloading=true
    this.fetch()   
  }

  private fetch(){


    const params=Object.assign({}, this.filter,{
      offset:this.offset,
      limit: this.limit
    })
    this.oSub=this.ordersService.fetch(params).subscribe(orders=>{      
       this.orders=this.orders.concat(orders)
       this.noMoreOrders= orders.length<STEP
       this.loading=false
       this.reloading=false

       for(let idx=0;this.orders.length>idx+1; idx++){         
        this.userService.getById(this.orders[idx].user).subscribe(user=>{          
          this.users.push(user)
        })
      //  console.log('find '+this.users.indexOf<UserFull>({user: "5fd0d8da692a3334ec0c4cd8"}))
       }
    })
    
   
  }

  isFiltered(): boolean{
    return Object.keys(this.filter).length!==0
  }

  loadMore(){
    this.offset+=STEP
    this.loading=true
    this.fetch()
  }

  ngOnDestroy(){
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit(){
    this.tooltip=MaterialService.initTooltip(this.tooltipRef)
  }
  
  applyFilter(filter: Filter){
    this.orders=[]
    this.offset=0
    this.filter=filter
    this.reloading=true
    this.fetch()
  }

}
