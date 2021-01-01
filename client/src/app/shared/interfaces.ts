import { Time } from '@angular/common';

export interface User{
    email: string
    password: string
}

export interface Message{
    message:string
}

export interface Tour{
    name:string
    coast: Number
    datePlaces:DatePlaces
    insallmentPlan: Boolean
    transportType: String
    categoryTour:string
    description?:string
    images?: string[]        
    _id?: string        
}

export interface DatePlaces{
    dateTo:Date
    dateFrom:Date
    freePlaces:Number
}
export interface Day{
    _id?:string
    date:string//Date
    time:string//Time[]
    action:string
    cost:Number
}
export interface Schedule{
    name: string 
    contries?: string[]
    days?:Day[]
    hotels?:string[]
    tour:string
    _id?: string
}

export interface CategoryTour{
    name: string
    imagePath?: string
    _id?: string
}

export interface UserFull{
    fullName: string
    email: string
    phones:number[]    
    password?: string
    imagePath?: string
    status?:string
    _id?: string
}

export interface Transfer{
    nameDirect: string
    timeTo: string
    timeFrom:string
    _id?:   string
}

export interface Address{
    contry:string
    town: string
    street:string
    number: number
    corpus?:string                 
}

export interface HotelService{
    name:string
    typeServ:string
    cost:Boolean
}

export interface Hotel{ 
    name:string   
    text?: string
    site?:string
    address: Address
    phoneList: number[]   
    stars: Number
    hotelService?:HotelService[]          
    imagePaths?: string[]        
    _id?: string        
}

export interface TimePlaces{
    dateTo:Date
    dateFrom:Date
    statusR:Boolean
}

export interface HotelServices{
    nameHotelService:string   
    _id?:string 
}

export interface Room{ 
    number:string   
    type: string[]
    cost: Number
    berth: number[]   
    hotel:string  
    time:TimePlaces[]
    imagePaths?: string[]        
    _id?: string        
}

export interface Service{
    type:string
    objectId?: string  
}
export interface Order{ 
  date?: Date;
  order?: number;
  service:Service
  requestS:boolean
  user?: string;
  name:string
  phone: number  
  email?:string
  description?:string
  clientId?: string;
  _id?: string;       
}

export interface Filter{
    start?: Date
    end?: Date
    order?: number
  }

  export interface OverviewPage{
    orders:OverviewPageItem
    ordersUser:OverviewPageItem
  }
  
  export interface OverviewPageItem{
    percent:number
    compare:number
    yesterday:number
    isHigher:boolean
  }
  
  export interface AnalyticsPage{    
    chart:  AnalyticsChartItem[]
  }
  
  export interface AnalyticsChartItem{    
    order:number
    label: string
  }

  export interface FilterTour{
    start?: Date
    end?: Date
    contry?: string
    costStart?:number
    costEnd?:number
  }