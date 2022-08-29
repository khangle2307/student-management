import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage: number = 0;
  @Input() totalPage: number = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  public onChangePage(type: string, page: number): void {
    this.changePage.emit(page);
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page)
  }

  public onPrevious(): void {
    this.previous.emit(this.currentPage)
  }

  public onFirst(): void {
    this.currentPage = this.pages[0];
    console.log("currentPage page : ", this.currentPage);

  }

  public onLast(): void {
    this.currentPage = this.pages.length;
    console.log("currentPage page : ", this.currentPage);

  }

  public onNext(): void {
    this.next.emit(this.currentPage)
  }


  private getPagesCount(currentPage: number, totalPage: number): any[] {
    if (totalPage <= 7) {
      return [...Array(totalPage).keys()].map(x => ++x);
    }

    if (currentPage > 5) {
      if (currentPage >= 3) {
        const result = [1, '...', totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
        console.log(result);

        return result;

      } else {

        return [1, "...", currentPage - 1, currentPage, currentPage + 1, totalPage];

      }
    }

    return [1, 2, 3, 4, 5, '...', totalPage];
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['currentPage'] && changes['currentPage'].currentValue) ||
      (changes['totalPage'] && changes['totalPage'].currentValue)
    ) {
      this.pages = this.getPagesCount(this.currentPage, this.totalPage)
    }
  }

  ngOnInit(): void {

  }


}
