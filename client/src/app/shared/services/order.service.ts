import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message, Order } from "../interfaces";


@Injectable({
    providedIn:'root'
})
export class OrderService{
    constructor(private http: HttpClient){}

    fetch(params: any={}): Observable<Order[]>{
        return this.http.get<Order[]>('/api/order', {
            params:new HttpParams({
                fromObject: params
            })
        })
    }

    getByStatus(requestS: Boolean): Observable<Order[]>{
        return this.http.get<Order[]>(`/api/order/${requestS}` )
    }

    create(order: Order): Observable<Order>{        
        return this.http.post<Order>('/api/order',order)
    }
    update(order: Order, id:string): Observable<Order>{
        return this.http.patch<Order>(`/api/order/${id}`,order)
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/order/${id}`)
    }
}