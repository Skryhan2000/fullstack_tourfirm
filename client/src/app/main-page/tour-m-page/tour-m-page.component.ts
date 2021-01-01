import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CategoryTour } from 'src/app/shared/interfaces';
import { CategoryTourService } from 'src/app/shared/services/categoryTour.service';

@Component({
  selector: 'app-tour-m-page',
  templateUrl: './tour-m-page.component.html',
  styleUrls: ['./tour-m-page.component.css']
})
export class TourMPageComponent implements OnInit {

  
  categoryTour: CategoryTour

  constructor(private categoriesTourService: CategoryTourService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(
        (params: Params)=>{
          if(params['id']){            
            return this.categoriesTourService.getById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      categoryTour=>{
        if(categoryTour){
          this.categoryTour=categoryTour          
        }
      },
      error=> MaterialService.toats(error.error.message)
      )
  }

}
