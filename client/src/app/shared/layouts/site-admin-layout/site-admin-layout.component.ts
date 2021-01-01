import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-admin-layout',
  templateUrl: './site-admin-layout.component.html',
  styleUrls: ['./site-admin-layout.component.css']
})
export class SiteAdminLayoutComponent implements  AfterViewInit {

@ViewChild('floating') floatingRef: ElementRef
isModerator=false

  links=[
    {url:'/overview', name:'Обзор'}, 
    {url:'/analytics', name:'Аналитика'},   
    {url:'/categoriesTour', name:'Категории туров'},
    {url:'/hotels', name:'Отели'},
    {url:'/transfer', name:'Трансфер'},    
    {url:'/order', name:'Заявки'},       
    {url:'/history', name:'История'}
  ]
  constructor(private auth: AuthService, private router: Router) { 
    this.auth.statusByToken().subscribe(
      status=>{                  
       if(status.includes("Модератор"))
       this.links.push({url:'/employeis', name:'Сотрудники'})       
      },
      error=>{
        MaterialService.toats(error.error.message)        
      })        
   
  }

  ngAfterViewInit(){
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event){    
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
