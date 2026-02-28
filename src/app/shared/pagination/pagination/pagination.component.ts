import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    console.log('current in receive' , this.currentPage)
  }
  ngOnChanges(){
console.log('current in receive change' , this.currentPage)
  }
 // 👇 These come from book component
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;      // Receives 11 here!
  @Input() itemsPerPage: number = 10;

  @Output() pageChange = new EventEmitter<number>();

  // Calculate total pages (11 / 10 = 2 pages)
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);  // 11/10 = 2
  }

  // Show "Showing 1-10 of 11 books"
  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;  // 1
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);  // 10
  }

  // Check if there's a next page
  get hasNext(): boolean {
    return this.currentPage < this.totalPages;  // 1 < 2 = true
  }

  // Check if there's a previous page
  get hasPrevious(): boolean {
    return this.currentPage > 1;  // 1 > 1 = false
  }

  // 👇 ADD THIS METHOD - for Previous button
  previous() {
    if (this.hasPrevious) {
      console.log('Going to previous page:', this.currentPage - 1);
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // 👇 ADD THIS METHOD - for Next button
  next() {
    if (this.hasNext) {
      console.log('Going to next page:', this.currentPage + 1);
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  // 👇 ADD THIS METHOD - for page number clicks
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      console.log('Going to page:', page);
      this.pageChange.emit(page);
    }
  }
}
