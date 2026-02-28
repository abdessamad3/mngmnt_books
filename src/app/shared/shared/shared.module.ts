import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageComponent, PaginationComponent, SearchBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [MessageComponent, PaginationComponent, SearchBarComponent],
})
export class SharedModule {}
