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
  @Input() currentPage: number = 0;
  @Input() totalItem: number = 0;
  @Input() itemPerPage: number = 0;

  @Output() pageOnChage: EventEmitter<number> = new EventEmitter<number>();
  pages: number[] = [];
  totalPage: number[] = [];

  public pageChange(page: number) {
    this.pageOnChage.emit(page);
  }

  public onPrevious(page: number[], skip: number): number[] {
    for (let i = 0; i < this.totalPage.length; i++) {
      page[i] = this.totalPage[i] - skip;
      console.log(`value of page ${this.totalPage[i]} and index ${i} : `, page[i]);
    }
    return page
  }

  public onNext(page: number[], skip: number): number[] {
    for (let i = 0; i < this.totalPage.length; i++) {
      page[i] = this.totalPage[i] + skip;
      console.log(`value of page ${this.totalPage[i]} and index ${i} : `, page[i]);
    }
    return page
  }

  public onChangeTotalItem(value: number) {
    this.totalPage = this.getPages(this.currentPage, value);
    console.table(this.totalPage);
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

  ngOnInit(): void {

  }

  // private getPages  (currentPage: number, totalPage: number): any[] {
  //   totalPage = Math.ceil(this.totalItem / this.itemPerPage);
  //   console.log("totalPage count : ", totalPage);

  //   if (totalPage <= 7) {
  //     const result = [...Array(totalPage).keys()].map(x => ++x);
  //     console.log("result of array : ", result);
  //     return result;
  //   }

  //   if (currentPage > 5) {
  //     if (currentPage >= totalPage - 4) {
  //       const result = ['...', currentPage, currentPage + 1, currentPage + 2, '...']
  //       console.log("result of current >= totalPage -4 : ", result);
  //       return result;
  //     }
  //   }

  //   const result = [1, 2, 3, 4, 5, "..."];
  //   console.log("totalPage length : ", result);
  //   return result;
  // }


  // if (currentPage > 5) {
  // }

  // if (currentPage >= totalPage - 4) {
  //   const pages: Page[] = [];
  //   for (let i = 1; i <= totalPage; i++) {
  //     pages.push({
  //       label: i,
  //       value: i,
  //     });
  //   }

  //   pages.unshift({ label: '...', value: currentPage - -1 });
  //   pages.push({ label: '...', value: currentPage + 1 });
  //   console.log('new pages : ', pages);
  //   const result = pages;
  //   console.log('result of current >= totalPage -4 : ', result);
  //   return result;
  // }

  private getPages(currentPage: number, totalPage: number): any[] {
    totalPage = Math.ceil(this.totalItem / this.itemPerPage);
    if (totalPage <= 7) {
      return [...Array(totalPage).keys()].map((x) => ++x);
    }

    const result = [...Array(totalPage).keys()].map((x) => ++x as any).slice(0, 5);
    return result;
  }
}
