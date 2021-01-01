import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTour, Message, User, UserFull } from '../interfaces';

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http: HttpClient){}

    fetch(): Observable<UserFull[]>{
        return this.http.get<UserFull[]>('/api/user')
    }


    getById(id: string): Observable<UserFull>{
        return this.http.get<UserFull>(`/api/user/${id}`)
    }

    create(user:UserFull,
      //  fullName: string, email: string, password: string,phones: number[],
        //status: string,
        image?: File ): Observable<UserFull>{        
        const fd=new FormData()
        if(image){
            fd.append('image', image, image.name)
        }        
        fd.append('fullName',user.fullName)
        fd.append('email',user.email)
        fd.append('password',user.password)
        fd.append('phones',user.phones.toString())
        fd.append('status',status)        
      return  this.http.post<UserFull>('/api/user', user)//fd)
    }
  
    update(user:UserFull,
        //id: string,fullName: string, email: string, password: string,phones: number[],status: string,
        image?: File): Observable<UserFull>{
            const fd=new FormData()
            if(image){
                fd.append('image', image, image.name)
            }
            fd.append('fullName',user.fullName)
            fd.append('email',user.email)
            fd.append('password',user.password)
            fd.append('phones',user.phones.toString())
            fd.append('status',user.status)
      return  this.http.patch<UserFull>(`/api/user/${user._id}`, user)//fd)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/user/${id}`)
    }
}