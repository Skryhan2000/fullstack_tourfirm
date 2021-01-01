import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Schedule } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class ScheduleService{
    constructor(private http: HttpClient){}

    fetch(tourId:string): Observable<Schedule[]>{
        return this.http.get<Schedule[]>(`/api/schedule/${tourId}`)
    }

    create(schedule: Schedule): Observable<Schedule>{        
        return this.http.post<Schedule>('/api/schedule', schedule)
    }

    update(schedule: Schedule): Observable<Schedule>{
        return this.http.patch<Schedule>(`/api/schedule/${schedule._id}`, schedule)
    }

    delete(schedule: Schedule): Observable<Message>{
        return this.http.delete<Message>(`/api/schedule/${schedule._id}`)
    }
}