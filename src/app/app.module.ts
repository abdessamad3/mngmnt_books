import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeliteBookDialogComponent } from './delite-book-dialog/delite-book-dialog.component';
import { EditBookDialogComponent } from './edit-book-dialog/edit-book-dialog.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AddbookModalComponent } from './books/addbook-modal/addbook-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBookModalComponent } from './books/delete-book-modal/delete-book-modal.component';
import { MessageComponent } from './shared/message/message.component';
import { SharedModule } from './shared/shared/shared.module';
import { PaginationComponent } from './shared/pagination/pagination/pagination.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { ListBooksComponent } from './books/list-books/list-books.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    AddBookDialogComponent,
    DeliteBookDialogComponent,
    EditBookDialogComponent,
    MenuComponent,
    AddbookModalComponent,
    DeleteBookModalComponent,
    ListBooksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgbModule,
    SharedModule

  ],
  entryComponents: [
    AddbookModalComponent  // Required for Angular 14
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
