import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BooksComponent } from './component/books/books.component';
import { AuthorsComponent } from './component/authors/authors.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeheaderComponent } from './component/homeheader/homeheader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OnebookComponent } from './component/onebook/onebook.component';
import { OneAuthorComponent } from './component/oneauthor/one-author.component';
import { OneCategoryComponent } from './component/one-category/one-category.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MainComponentComponent } from './component/main-component/main-component.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxStarsModule } from 'ngx-stars';
import { SearchComponent } from './component/search/search.component';
import { MybooksComponent } from './component/mybooks/mybooks.component';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { BookDetailsComponent } from './component/book-details/book-details.component';
import {RatingModule} from 'primeng/rating';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatConfirmDialogComponent } from './component/mat-confirm-dialog/mat-confirm-dialog.component';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    BooksComponent,
    AuthorsComponent,
    NotfoundComponent,
    NavbarComponent,
    HomeheaderComponent,
    OnebookComponent,
    OneAuthorComponent,
    OneCategoryComponent,
    MainComponentComponent,
    SearchComponent,
    MybooksComponent,
    BookDetailsComponent,
    UserprofileComponent,
    MatConfirmDialogComponent,
    

  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    NgxStarsModule,
    MatMenuModule,
    MatIconModule,
    RatingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule
   // NgxUsefulSwiperModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UserprofileComponent,MatConfirmDialogComponent]
})
export class AppModule { }
