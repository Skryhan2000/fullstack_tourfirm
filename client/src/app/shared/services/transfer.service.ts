import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Transfer } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class TransferService{
    constructor(private http: HttpClient){}

    fetch(): Observable<Transfer[]>{
        return this.http.get<Transfer[]>(`/api/transfer/`)
    }

    create(transfer: Transfer): Observable<Transfer>{
        
        return this.http.post<Transfer>('/api/transfer', transfer)
    }

    update(transfer: Transfer): Observable<Transfer>{
        return this.http.patch<Transfer>(`/api/transfer/${transfer._id}`, transfer)
    }

    delete(transfer: Transfer): Observable<Message>{
        return this.http.delete<Message>(`/api/transfer/${transfer._id}`)
    }
}