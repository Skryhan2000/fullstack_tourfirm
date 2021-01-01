import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserFull } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    private token=null //Можно попробовать тоже самое с переменной статус для пользователя

    constructor(private http: HttpClient){}
    
    register(user: UserFull): Observable<UserFull>{        
        return this.http.post<UserFull>('/api/auth/register', user)
    }

    login(user: User): Observable<{token:string}>{
        return this.http.post<{token:string}>('/api/auth/login', user)
        .pipe(
            tap(
                ({token})=>{
                    localStorage.setItem('auth-token', token)
                    this.setToken(token)
                }
            )
        )
    }
    status(email: string): Observable<string>{
        return this.http.get<string>(`/api/auth/user/status/${email}`)
    }

    statusByToken(): Observable<string> {                  
        return this.http.get<string>(`/api/auth/user/status/${ jwt_decode(this.getToken())['email']}`)
    }
    userIdByToken():string {                  
        return  jwt_decode(this.getToken())['userId']
    }

    setToken(token: string){
        this.token=token
    }

    getToken(): string{
        return this.token
    }

    isAuthenticated(): boolean{
        return !!this.token
    }

    logout(){
        this.setToken(null)
        localStorage.clear()
    }
}