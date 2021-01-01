import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analitics.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit , OnDestroy {

  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  pending=true


  constructor(private service: AnalyticsService) { }

  ngAfterViewInit(){
    const orderConfig: any={
      label:'Количество заявок',
      color:'rgb(255,99,132)'
   }

   this.aSub= this.service.getAnalytics().subscribe((data: AnalyticsPage)=>{
    orderConfig.labels=data.chart.map(item=>item.label)
    orderConfig.data=data.chart.map(item=>item.order)

    const orderCtx=this.orderRef.nativeElement.getContext('2d')
      orderCtx.canvas.height='300px'

      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending=false
   })

  }

  ngOnDestroy(){
    if(this.aSub){this.aSub.unsubscribe()}
  }
}

function createChartConfig({labels, data,label,color}){
  return{
    type:'line',
    options:{
      responsive: true
    },
    data:{
      labels,
      datasets:[
        {
          label,data,
          borderColor: color,
          steppedLine:false,
          fill:false
        }
      ]
    }
  }
}