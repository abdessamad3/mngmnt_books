import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Input() initialValue = '';

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchTerm = '';

  ngOnInit(): void {
    this.searchTerm = this.initialValue;
  }

  // Triggered when Enter key is pressed
  onEnterPressed(): void {
    const term = this.searchTerm.trim();
    this.search.emit(term);
  }
}
