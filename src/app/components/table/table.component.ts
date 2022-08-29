import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputForm, Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public currentPage: number = 1;
  public totalPage: number = 0;
  public perPage: number = 10;
  public itemsToDisplay: Student[] = [];
  public students: Student[] = [];
  student: InputForm = {
    fullName: '',
    age: 0,
    gender: '',
    major: '',
    avg: 0,
  }

  public onGoTo(page: number): void {
    this.currentPage = page;
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);
  }

  public onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);
  }

  public onNext(page: number): void {
    this.currentPage = page + 1;
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);
  }


  public paginate(currentPage: number, perPage: number): Student[] {
    return [...this.students.slice((currentPage - 1) * perPage).slice(0, perPage)];
  }

  constructor(
    private studentService: StudentService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStudents();

  }

  getStudents() {
    this.studentService.getALl().subscribe(data => {
      this.students = data;
      this.totalPage = Math.ceil(this.students.length / this.perPage);
      this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);
    })
  }

  getStudent(_id: number) {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.studentService.getById(Number(id)).subscribe((data) => {
    })
  }

  removeById(id: number) {
    this.studentService.removeById(id).subscribe(() => {
      this.students = this.students?.filter(item => item.id !== id)
      window.location.reload();
    })
  }

  onSubmit(data: InputForm) {
    this.studentService.create(data).subscribe(data => {
      alert("Thêm sản phẩm thành công")
      window.location.reload();
    })
  }
  onChangeCurrentPage(value: number) {
    this.currentPage = value;
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);

  }

  onChangeTotalItem(value: any) {
    this.students.length = value;
    console.log("totalPageItem : ", this.students.length);
    this.totalPage = Math.ceil(this.students.length / this.perPage);
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);

  }

  onChangePerPage(value: number) {
    this.perPage = value;
    console.log("item per page : ", this.perPage);
    this.totalPage = Math.ceil(this.students.length / this.perPage);
    this.itemsToDisplay = this.paginate(this.currentPage, this.perPage);

  }

}
