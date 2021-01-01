import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTour } from '../shared/interfaces';
import { CategoryTourService } from '../shared/services/categoryTour.service';

@Component({
  selector: 'app-category-tour-page',
  templateUrl: './category-tour-page.component.html',
  styleUrls: ['./category-tour-page.component.css']
})
export class CategoryTourPageComponent implements OnInit {

 

  categoriesTour$: Observable<CategoryTour[]>

  constructor(private categoryTourService: CategoryTourService) { }

  ngOnInit(): void {    
  this.categoriesTour$=  this.categoryTourService.fetch()
    
  }

}
