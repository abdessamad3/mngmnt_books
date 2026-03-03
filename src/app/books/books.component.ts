import { MessageService } from './../shared/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { map } from 'rxjs/operators';
import { book } from './books.model';
import { DeliteBookDialogComponent } from '../delite-book-dialog/delite-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddbookModalComponent } from './addbook-modal/addbook-modal.component';
import { BooksService } from './books.service';
import { DeleteBookModalComponent } from './delete-book-modal/delete-book-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
 books: book[] = [];
  isloading = false;
  error = null;

  // Search param
  lastSearchTerm = '';

  // ============== NEW: SORTING PROPERTIES ==============
  sortColumn: string = 'id';           // Default sort by ID
  sortOrder: 'asc' | 'desc' = 'desc';  // Default newest first (ID desc)

  // For UI display
  activeSort: {column: string, order: 'asc' | 'desc'} = {
    column: 'id',
    order: 'desc'
  };

  // Column display names for UI
  columnLabels: {[key: string]: string} = {
    'id': 'ID',
    'name': 'Title',
    'author': 'Author',
    'publicationYear': 'Year',
    'language': 'Language',
    'isbn': 'ISBN'
  };
  // =====================================================

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;
  hasNext = false;
  hasPrevious = false;

  constructor(
    private BooksService: BooksService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  // ============== UPDATED: fetchdata with sort parameters ==============
  fetchdata(): void {
    this.isloading = true;

    // Add sort parameters to the service call
    this.BooksService.searchBooks(
      this.currentPage,
      this.itemsPerPage,
      this.lastSearchTerm,
      this.sortColumn,     // <-- NEW: Add sort column
      this.sortOrder       // <-- NEW: Add sort order
    ).subscribe({
      next: (res) => {
        this.books = res.data;
        this.totalItems = res.pagination.totalItems;
        this.totalPages = res.pagination.totalPages;
        this.hasNext = res.pagination.hasNext;
        this.hasPrevious = res.pagination.hasPrevious;
        this.isloading = false;
        this.error = null;
      },
      error: (err: any) => {
        this.isloading = false;
        this.messageService.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchdata();
  }

  onSearch(searchTerm: string): void {
    this.lastSearchTerm = searchTerm;
    this.currentPage = 1;
    this.fetchdata();
  }

  // ============== NEW: SORTING METHODS ==============
  /**
   * Called when user clicks on a column header
   * First click: A→Z (ascending)
   * Second click: Z→A (descending)
   */
  onSort(column: string): void {
    console.log(`Sorting by: ${column}`);

    // If clicking the SAME column, toggle order
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
    // If clicking a DIFFERENT column, start with asc (A→Z)
    else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }

    // Update UI state
    this.activeSort = {
      column: this.sortColumn,
      order: this.sortOrder
    };

    // Reset to first page when sorting changes
    this.currentPage = 1;

    // Fetch data with new sort
    this.fetchdata();
  }

  /**
   * Get the appropriate Bootstrap icon for sort indicator
   */
  getSortIcon(column: string): string {
    if (this.activeSort.column !== column) {
      return 'bi-arrow-down-up'; // Unsorted (double arrow)
    }
    return this.activeSort.order === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  /**
   * Check if a column is currently sorted
   */
  isSorted(column: string): boolean {
    return this.activeSort.column === column;
  }

  /**
   * Get display name for column
   */
  getColumnLabel(column: string): string {
    return this.columnLabels[column] || column;
  }
  // ==================================================

  openAddModal(): void {
    try {
      const modalRef = this.modalService.open(AddbookModalComponent);
      modalRef.componentInstance.mode = 'add';
      modalRef.componentInstance.bookData = {
        name: '',
        isbm: '',
        price: null,
        publishedAt: '',
        pages: null,
        language: 'arabic',
      };
      modalRef.result.then(
        (result: { action: string; book: book }) => {
          if (result.action === 'add') {
            try {
              this.BooksService.postData(result.book).subscribe((resp) => {
                this.messageService.success('book added successfuly!');
                this.fetchdata();
              });
            } catch (error) {
              console.log('error adding:', error);
              this.messageService.error(`❌ Error: ${error.message}`);
            }
          }
        },
        (reason) => {
          console.log('Modal dismissed:', reason);
        },
      );
    } catch (error) {
      this.messageService.error(`❌ Error Modal: ${error.message}`);
    }
  }

  openEditModal(bookData: book): void {
    try {
      const modalRef = this.modalService.open(AddbookModalComponent);
      modalRef.componentInstance.mode = 'edit';
      modalRef.componentInstance.bookData = { ...bookData };
      modalRef.result.then(
        (result: { action: string; book: book }) => {
          if (result.action === 'edit') {
            try {
              this.BooksService.editData(result.book.id, result.book).subscribe(
                (resp) => {
                  this.fetchdata();
                  this.messageService.success('book updated successfuly!');
                },
              );
            } catch (error) {
              console.log('error adding:', error);
              this.messageService.error(`❌ Error: ${error.message}`);
            }
          }
        },
        (reason) => {},
      );
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  openDeleteModal(book: book) {
    const modalRef = this.modalService.open(DeleteBookModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.bookData = book;
    modalRef.result.then(
      (result) => {
        if (result && result.confirmed) {
          this.BooksService.deleteData(result.book.id).subscribe((res) => {
            this.fetchdata();
            this.messageService.success('book deleted successfuly');
          });
        }
      },
      (reason) => {
        console.log('Delete modal dismissed:', reason);
      },
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchdata();
  }

  onPerPageChange(perPage: number) {
    this.itemsPerPage = perPage;
    this.currentPage = 1;
    this.fetchdata();
  }
  //--------------------------------------------------Mat part---------------------------------------------------------------------------------------------

  AddBookDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '60wv',
    });

    dialogRef.afterClosed().subscribe((result: book) => {
      if (result) {
        this.BooksService.postData(result)
          //if i understand : this is work if the data commes like this : key : { 'name':'value} but my response is {name : value} directly
          // .pipe(
          //   map(resp => {
          //     const respArray = [];
          //     for(const key in resp){
          //       if(resp.hasOwnProperty(key)){
          //         respArray.push({...resp[key], id : key})
          //       }
          //     }
          //     return respArray;
          //   }))
          .subscribe((resp) => {
            console.log(resp);
            this.fetchdata();
          });
      }
    });
  }

  onDeleteDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeliteBookDialogComponent, {
      width: '250px',
      data: {
        id: id,
        title: `delete ${name}`,
        message: `Are you sure you want to delete ${name} ?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.onDelete(id);
      }
    });
  }
  onDelete(id: number) {
    this.BooksService.deleteData(id).subscribe((res) => {
      this.fetchdata();
    });
  }

  onEditDialog(book: book): void {
    console.log(book);
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '60wv',
      data: {
        data: book,
        title: `edit`,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.onEdit(data);
      }
    });
  }

  onEdit(book: book) {
    console.log(book);
    this.BooksService.editData(book.id, book).subscribe((res) => {
      this.fetchdata();
    });
  }
}
