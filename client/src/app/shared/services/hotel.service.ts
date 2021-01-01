import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Hotel, Message } from '../interfaces';

@Injectable({
    providedIn:'root'
})
export class HotelsService{
    
    

    constructor(private http: HttpClient){}

    fetch(): Observable<Hotel[]>{        
        return this.http.get<Hotel[]>('/api/hotel')
    } 
 

    getById(id: string): Observable<Hotel>{
        return this.http.get<Hotel>(`/api/hotel/${id}`)
    }

    create(newHotel: Hotel, image?: File): Observable<Hotel>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name',newHotel.name)        
        fd.append('text',newHotel.text)        
        fd.append('site',newHotel.site)        
        fd.append('contry',newHotel.address.contry)        
        fd.append('town',newHotel.address.town)        
        fd.append('street',newHotel.address.street)        
        fd.append('number',newHotel.address.number.toString())        
        fd.append('corpus',newHotel.address.corpus)        
        fd.append('phoneList',newHotel.phoneList.toString())        
        fd.append('stars',newHotel.stars.toString())              
        fd.append('hotelService',newHotel.hotelService.toString())         
      //  fd.append('hotelService',newHotel.hotelService.toString()) 
        //fd.append('hotelService',newHotel.hotelService.toString()) 
      return  this.http.post<Hotel>('/api/hotel', newHotel)//fd)изменяю и сервер
    }

    update(id: string, newHotel: Hotel, image?: File): Observable<Hotel>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name',newHotel.name)        
        fd.append('text',newHotel.text)        
        fd.append('site',newHotel.site)                           
       fd.append('contry',newHotel.address.contry)        
       fd.append('town',newHotel.address.town)        
       fd.append('street',newHotel.address.street)        
       fd.append('number',newHotel.address.number.toString())        
       fd.append('corpus',newHotel.address.corpus)        
        fd.append('phoneList',newHotel.phoneList.toString())        
        fd.append('stars',newHotel.stars.toString())         
        fd.append('hotelService',newHotel.hotelService.toString())         
      return  this.http.patch<Hotel>(`/api/hotel/${id}`, newHotel)//fd)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/hotel/${id}`)
    }
}