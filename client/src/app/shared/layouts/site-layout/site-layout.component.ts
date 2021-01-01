import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  isAuthenticated=false
  isClient=true

  constructor(private auth: AuthService,  private router: Router) { 
    this.isAuthenticated=this.auth.isAuthenticated()
    if(this.isAuthenticated){
    this.auth.statusByToken().subscribe(
      status=>{                         
       if(status.includes("client"))
       this.isClient=true
       else
       this.isClient=false
      },
      error=>{
        MaterialService.toats(error.error.message)        
      })        
    }
   
   }

  ngOnInit(): void {
    
  }

  logout(event: Event){    
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/'])
    this.isAuthenticated=false
  }

}
