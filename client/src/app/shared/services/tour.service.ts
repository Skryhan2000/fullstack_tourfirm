import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Tour } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class TourService{
    constructor(private http: HttpClient){}

    

    find(contry: string): Observable<Tour[]>{               
        return this.http.get<Tour[]>(`/api/tour/find/${contry}`
        // , {
        //     params:new HttpParams({
        //         fromObject: params
        //     })
        // }
        )
    }

    fetch(categoryId: string): Observable<Tour[]>{
    return    this.http.get<Tour[]>(`api/tour/all/${categoryId}`)
    }

    getById(id: string): Observable<Tour>{
        return this.http.get<Tour>(`/api/tour/${id}`)
    }

    create(categoryId: string, name: string,  contry: string,cost: number,
        dateTo: Date,dateFrom: Date, freePlaces: number,
        insallmentPlan: Boolean,
        transportType: string, description?: string, image?: File): Observable<Tour>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        if(description){
            fd.append('description', description)
        }
        fd.append('categoryTourId', categoryId)
        fd.append('name', name)
        fd.append('contry', contry)
        fd.append('cost', cost.toString())
        fd.append('dateTo',dateTo.toString())
        fd.append('dateFrom',dateFrom.toString())
        fd.append('freePlaces',freePlaces.toString())
        fd.append('transportType',transportType)
        fd.append('insallmentPlan',insallmentPlan.toString())
      return  this.http.post<Tour>('/api/tour', fd)
    }

    update(id: string, categoryId: string, name: string,contry: string,cost: number,
        dateTo: Date,dateFrom: Date, freePlaces: number,
        insallmentPlan: Boolean,
        transportType: string, description?: string, image?: File): Observable<Tour>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        if(description){
            fd.append('description', description)
        }
        fd.append('categoryTourId', categoryId)
        fd.append('name', name)
        fd.append('contry', contry)
        fd.append('cost', cost.toString())
        fd.append('dateTo',dateTo.toString())
        fd.append('dateFrom',dateFrom.toString())
        fd.append('freePlaces',freePlaces.toString())
        fd.append('transportType',transportType)
        fd.append('insallmentPlan',insallmentPlan.toString())
      return  this.http.patch<Tour>(`/api/tour/${id}`, fd)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/tour/${id}`)
    }
}