import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthorsComponent } from './component/authors/authors.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { BooksComponent } from './component/books/books.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponentComponent } from './component/main-component/main-component.component';
import { MybooksComponent } from './component/mybooks/mybooks.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { OneCategoryComponent } from './component/one-category/one-category.component';
import { OneAuthorComponent } from './component/oneauthor/one-author.component';
import { OnebookComponent } from './component/onebook/onebook.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';

const routes: Routes = [
  {path:'',component:MainComponentComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home'  , component: HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'authors' , component: AuthorsComponent},
    {path:'books'  , component: BooksComponent},
    {path:'search'  , component: SearchComponent},
    {path:'categories'  , component: CategoriesComponent},
    {path:'mybooks'  , component: MybooksComponent},
    {path:'userprofile'  , component: UserprofileComponent},
    {path:'books/:id'  , component: BookDetailsComponent},
    {path:'authors/:id'  , component: OneAuthorComponent},
    {path:'categories/:id'  , component: OneCategoryComponent},
  ]},
  {path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
