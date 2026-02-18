import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliteBookDialogComponent } from './delite-book-dialog.component';

describe('DeliteBookDialogComponent', () => {
  let component: DeliteBookDialogComponent;
  let fixture: ComponentFixture<DeliteBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliteBookDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliteBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
