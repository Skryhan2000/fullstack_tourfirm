import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CategoriesFormComponent } from './category-tour-page/categories-form/categories-form.component';
import { TourPageComponent } from './category-tour-page/categories-form/tour-form/tour-page/tour-page.component';
import { CategoryTourPageComponent } from './category-tour-page/category-tour-page.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HotelFormComponent } from './hotels-page/hotel-form/hotel-form.component';
import { HotelServicesFormComponent } from './hotels-page/hotel-form/hotel-services-form/hotel-services-form.component';
import { HotelsPageComponent } from './hotels-page/hotels-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CategoryMPageComponent } from './main-page/category-m-page/category-m-page.component';
import { CreditMPageComponent } from './main-page/credit-m-page/credit-m-page.component';
import { HotelMPageComponent } from './main-page/hotel-m-page/hotel-m-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TourMPageComponent } from './main-page/tour-m-page/tour-m-page.component';
import { TransferMPageComponent } from './main-page/transfer-m-page/transfer-m-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteAdminLayoutComponent } from './shared/layouts/site-admin-layout/site-admin-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SiteUserLayoutComponent } from './shared/layouts/site-user-layout/site-user-layout.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { UserHistoryPageComponent } from './user-pages/user-history-page/user-history-page.component';
import { UserInfoPageComponent } from './user-pages/user-info-page/user-info-page.component';
import { UserOrderPageComponent } from './user-pages/user-order-page/user-order-page.component';

const routes: Routes=[
    {
        path:'', component: AuthLayoutComponent, children:[           
            {path:'', redirectTo:'/main', pathMatch:'full'},            
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path:'', component: SiteAdminLayoutComponent, canActivate:[AuthGuard], children:[
            {path:'overview', component: OverviewPageComponent},
            {path:'employeis', component: EmployeesPageComponent},            
            {path:'categoriesTour', component: CategoryTourPageComponent},
            {path:'categoriesTour/new', component: CategoriesFormComponent},
            {path:'categoriesTour/:id', component: CategoriesFormComponent},
            {path:'tour/new/:id', component: TourPageComponent},
            {path:'tour/:id', component: TourPageComponent},
            {path:'hotels', component: HotelsPageComponent},
            {path:'hotels/new', component: HotelFormComponent},
            {path:'hotels/:id', component: HotelFormComponent},
            {path:'hotelServices', component: HotelServicesFormComponent},
            {path:'transfer', component: TransferPageComponent},
            {path:'analytics', component: AnalyticsPageComponent},
            {path:'order', component: OrderPageComponent},
            {path:'history', component: HistoryPageComponent}
        ]
    },   
    {
        path:'', component: SiteUserLayoutComponent,canActivate:[AuthGuard], children:[
           {path:'userInfo', component: UserInfoPageComponent},
           {path:'userOrder', component: UserOrderPageComponent},
           {path:'userHistory', component: UserHistoryPageComponent}
     ]
    },
    {
        path:'', component: SiteLayoutComponent, children:[
            {path:'main', component: MainPageComponent},
            {path:'mainPage/tours/:id', component: TourMPageComponent},
            {path:'mainPage/categoryTour', component: CategoryMPageComponent},
            {path:'mainPage/hotel', component: HotelMPageComponent},
            {path:'mainPage/transfer', component: TransferMPageComponent},
            {path:'mainPage/credit', component: CreditMPageComponent},
            {path:'mainPage/search', component: SearchPageComponent}
           
        ]
    }
   
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRotingModule{    
}