import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Room } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class RoomService{
    constructor(private http: HttpClient){}

    fetch(hotelId:string): Observable<Room[]>{
        return this.http.get<Room[]>(`/api/room/${hotelId}`)
    }

    create(room: Room): Observable<Room>{        
        return this.http.post<Room>('/api/room', room)
    }

    update(room: Room): Observable<Room>{
        return this.http.patch<Room>(`/api/room/${room._id}`, room)
    }

    delete(room: Room): Observable<Message>{
        return this.http.delete<Message>(`/api/room/${room._id}`)
    }
}