import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() placeholder = 'Search...';
  @Input() debounceTime = 0;                // 👈 0 = immediate request per keystroke
  @Input() disabled = false;
  // @Input() initialValue = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() backgroundColor = 'white';

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  @ViewChild('inputElement') inputElement!: ElementRef;

  searchTerm = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    // this.searchTerm = this.initialValue;
    this.searchSubject.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    ).subscribe(term => this.search.emit(term));
  }

  ngAfterViewInit() {
    // Keep focus after view initialises
    this.inputElement.nativeElement.focus();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
    this.clear.emit();
    // Refocus after clearing
    this.inputElement.nativeElement.focus();
  }

  getSizeClass(): string {
    switch (this.size) {
      case 'sm': return 'form-control-sm';
      case 'lg': return 'form-control-lg';
      default: return '';
    }
  }
}
