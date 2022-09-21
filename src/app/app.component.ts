import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage = 1;
  totalItem = 10;
  itemPerPage = 10;

  public pageChange(page: number) {
    this.currentPage = page;
    console.log(`value of page ${page} : `, page);
  }


}
