import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-user-layout',
  templateUrl: './site-user-layout.component.html',
  styleUrls: ['./site-user-layout.component.css']
})
export class SiteUserLayoutComponent implements OnInit {

  links=[
    {url:'/userInfo', name:'Главная информация'},    
    {url:'/userOrder', name:'Текущие заявки'},    
    {url:'/userHistory', name:'История заказов'}    
  ]
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event){    
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/main'])
  }
}


