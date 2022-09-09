import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage: number = 1;
  totalItem: number = 10;
  itemPerPage: number = 10;

  public pageChange(page: number) {
    this.currentPage = page;
  }


}
