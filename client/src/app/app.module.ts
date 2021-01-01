import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AppRotingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteAdminLayoutComponent } from './shared/layouts/site-admin-layout/site-admin-layout.component';
import { SiteUserLayoutComponent } from './shared/layouts/site-user-layout/site-user-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { MainPageComponent } from './main-page/main-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { CategoryTourPageComponent } from './category-tour-page/category-tour-page.component';
import { HotelsPageComponent } from './hotels-page/hotels-page.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { CategoriesFormComponent } from './category-tour-page/categories-form/categories-form.component';
import { TourFormComponent } from './category-tour-page/categories-form/tour-form/tour-form.component';
import { ScheduleTourComponent } from './category-tour-page/categories-form/tour-form/schedule-tour/schedule-tour.component';
import { TourPageComponent } from './category-tour-page/categories-form/tour-form/tour-page/tour-page.component';
import { HotelFormComponent } from './hotels-page/hotel-form/hotel-form.component';
import { RoomPageComponent } from './hotels-page/hotel-form/room-page/room-page.component';
import { HotelServicesFormComponent } from './hotels-page/hotel-form/hotel-services-form/hotel-services-form.component';
import { UserInfoPageComponent } from './user-pages/user-info-page/user-info-page.component';
import { UserOrderPageComponent } from './user-pages/user-order-page/user-order-page.component';
import { UserHistoryPageComponent } from './user-pages/user-history-page/user-history-page.component';
import { HotelMPageComponent } from './main-page/hotel-m-page/hotel-m-page.component';
import { TourMPageComponent } from './main-page/tour-m-page/tour-m-page.component';
import { TransferMPageComponent } from './main-page/transfer-m-page/transfer-m-page.component';
import { CategoryMPageComponent } from './main-page/category-m-page/category-m-page.component';
import { CategoryOrderPageComponent } from './main-page/category-m-page/category-order-page/category-order-page.component';
import { CreditMPageComponent } from './main-page/credit-m-page/credit-m-page.component';
import { HotelOrderPageComponent } from './main-page/hotel-m-page/hotel-order-page/hotel-order-page.component';
import { ModalMPageComponent } from './main-page/modal-m-page/modal-m-page.component';
import { TourOrderPageComponent } from './main-page/tour-m-page/tour-order-page/tour-order-page.component';
import { ScheduleOrderPageComponent } from './main-page/tour-m-page/tour-order-page/schedule-order-page/schedule-order-page.component';
import { RoomOrderPageComponent } from './main-page/hotel-m-page/hotel-order-page/room-order-page/room-order-page.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchListComponent } from './search-page/search-list/search-list.component';
import { SearchFilterComponent } from './search-page/search-filter/search-filter.component';
;


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteAdminLayoutComponent,
    SiteUserLayoutComponent,
    RegisterPageComponent,
    MainPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    CategoryTourPageComponent,
    HotelsPageComponent,
    EmployeesPageComponent,
    TransferPageComponent,
    OrderPageComponent,
    LoaderComponent,
    SiteLayoutComponent,
    CategoriesFormComponent,
    TourFormComponent,
    ScheduleTourComponent,
    TourPageComponent,
    HotelFormComponent,
    RoomPageComponent,
    HotelServicesFormComponent,
    UserInfoPageComponent,
    UserOrderPageComponent,
    UserHistoryPageComponent,
    HotelMPageComponent,
    TourMPageComponent,
    TransferMPageComponent,
    CategoryMPageComponent,
    CategoryOrderPageComponent,
    CreditMPageComponent,
    HotelOrderPageComponent,
    ModalMPageComponent,
    TourOrderPageComponent,
    ScheduleOrderPageComponent,
    RoomOrderPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    SearchPageComponent,
    SearchListComponent,
    SearchFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRotingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass:TokenInterceptor
  }],
    bootstrap: [AppComponent]
})
export class AppModule { }
