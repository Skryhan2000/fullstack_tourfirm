import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTour, Message } from '../interfaces';

@Injectable({
    providedIn:'root'
})
export class CategoryTourService{
    constructor(private http: HttpClient){}

    fetch(): Observable<CategoryTour[]>{
        return this.http.get<CategoryTour[]>('/api/categoryTour')
    }

    getById(id: string): Observable<CategoryTour>{
        return this.http.get<CategoryTour>(`/api/categoryTour/${id}`)
    }

    create(name: string, image?: File): Observable<CategoryTour>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name',name)        
      return  this.http.post<CategoryTour>('/api/categoryTour', fd)
    }

    update(id: string, name: string, image?: File): Observable<CategoryTour>{
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }
        fd.append('name',name)
      return  this.http.patch<CategoryTour>(`/api/categoryTour/${id}`, fd)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/categoryTour/${id}`)
    }
}