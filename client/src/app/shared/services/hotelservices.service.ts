import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, HotelServices } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class HotelServicesService{
    constructor(private http: HttpClient){}

    fetch(): Observable<HotelServices[]>{
        return this.http.get<HotelServices[]>(`/api/hotelServices/`)
    }

    create(hotelServices: HotelServices): Observable<HotelServices>{        
        return this.http.post<HotelServices>('/api/hotelServices', hotelServices)
    }

    update(hotelServices: HotelServices): Observable<HotelServices>{
        return this.http.patch<HotelServices>(`/api/hotelServices/${hotelServices._id}`, hotelServices)
    }

    delete(hotelServices: HotelServices): Observable<Message>{
        return this.http.delete<Message>(`/api/hotelServices/${hotelServices._id}`)
    }
}