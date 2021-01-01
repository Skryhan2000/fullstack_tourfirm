import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTour } from 'src/app/shared/interfaces';
import { CategoryTourService } from 'src/app/shared/services/categoryTour.service';

@Component({
  selector: 'app-category-order-page',
  templateUrl: './category-order-page.component.html',
  styleUrls: ['./category-order-page.component.css']
})
export class CategoryOrderPageComponent implements OnInit {

  categoriesTour$: Observable<CategoryTour[]>

  constructor(private categoryTourService: CategoryTourService) { }

  ngOnInit(): void {    
  this.categoriesTour$=  this.categoryTourService.fetch()
    
  }


}
