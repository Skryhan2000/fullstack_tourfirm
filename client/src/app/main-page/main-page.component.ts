import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  
  @ViewChild('parallax1') parallax1Ref: ElementRef
  @ViewChild('parallax2') parallax2Ref: ElementRef
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){ 
  MaterialService.initParallax(this.parallax1Ref)    
  MaterialService.initParallax(this.parallax2Ref)   
  }

  toPage(path: string){
    this.router.navigate([path])    
  }

}
