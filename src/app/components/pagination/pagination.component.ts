import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage = 0;
  @Input() totalItem = 0;
  @Input() itemPerPage = 0;
  pages: number[] = [];
  totalPage: number[] = [];
  @Output() pageOnChage: EventEmitter<number> = new EventEmitter<number>();


  public pageChange(page: number) {
    this.pageOnChage.emit(page);
  }

  public changePage(index: number) {
    this.currentPage = this.totalPage[index];
  }


  public onPrevious(pages: number[], skip: number): number[] {

    for (let i = 0; i < this.totalPage.length; i++) {
      pages[i] = this.totalPage[i] - skip;
      this.currentPage = this.totalPage[i] - skip + 6;
    }
    return pages
  }


  public onNext(pages: number[], skip: number): number[] {
    const totalPage = Math.ceil(this.totalItem / this.itemPerPage);

    for (let i = 0; i < this.totalPage.length; i++) {
      pages[i] = this.totalPage[i] + skip;
      this.currentPage = this.totalPage[i] - skip + 1;
    }
    console.log(pages);

    if (pages[0] >= totalPage - 5) {
      const lastPage = pages.slice(0, pages.indexOf(totalPage + 1, 0));
      console.log(`currentPage : ${pages[0]}`, typeof (pages[0]));
      console.log(`totalPage : ${totalPage}`, typeof (totalPage));
      pages = lastPage;
      console.log(pages);

      return pages;
    }

    return pages
  }


  public onChangeTotalItem(value: number) {
    this.totalPage = this.getPages(this.currentPage, value);
    this.pages.length = Math.ceil(this.totalItem / this.itemPerPage);
  }

  public onChanegItemPerPage(value: number) {
    this.pages.length = Math.ceil(this.totalItem / value);
    this.totalPage = this.getPages(this.currentPage, this.totalItem);
  }

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['currentPage'] && changes['currentPage'].currentValue) ||
      (changes['totalItem'] && changes['totalItem'].currentValue)
    ) {
      this.totalPage = this.getPages(this.currentPage, this.totalItem);
      this.pages.length = Math.ceil(this.totalItem / this.itemPerPage);
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  /**
   * 
   * @param currentPage : currentPage of pages
   * @param totalPage : length of totalPage
   * @return list of pages by condition
   */
  private getPages(currentPage: number, totalPage: number): any[] {
    const firstFiveElement = 5;
    totalPage = Math.ceil(this.totalItem / this.itemPerPage);
    if (totalPage <= firstFiveElement) {
      return [...Array(totalPage).keys()].map((x) => ++x);
    }

    const result = [...Array(totalPage).keys()].map((x) => ++x as any).slice(0, 6);
    return result;
  }
}


