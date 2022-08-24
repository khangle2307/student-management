import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputForm, Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public current: number = 1;
  // public total: number = 18;
  public itemsToDisplay: Student[] = [];
  public perPage = 2;
  public students: Student[] = [];
  public total = Math.ceil(this.students.length / this.perPage);
  student: InputForm = {
    fullName: '',
    age: 0,
    gender: '',
    major: '',
    avg: 0,
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
  }

  public paginate(current: number, perPage: number): Student[] {
    const result = [...this.students.slice((current - 1) * perPage).slice(0, perPage)];
    // return [...this.students.slice((current - 1) * perPage).slice(0, perPage)]
    console.log(result);

    return result;
  }

  constructor(
    private studentService: StudentService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStudents()
    console.log(this.paginate);

  }

  getStudents() {
    this.studentService.getALl().subscribe(data => {
      this.students = data;
      console.log(this.total);
      console.log(this.students);
      this.itemsToDisplay = this.paginate(this.current, this.perPage)
    })
  }

  getStudent(_id: number) {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.studentService.getById(Number(id)).subscribe((data) => {
      console.log(data);
    })
  }

  onSubmit(data: InputForm) {
    this.studentService.create(data).subscribe(data => {
      console.log(data);
      alert("Thêm sản phẩm thành công")
      window.location.reload();
    })
  }

  onRemove(id: number) {
    this.studentService.removeById(id).subscribe(() => {
      this.students = this.students?.filter(item => item.id !== id)
      window.location.reload();
    })
  }
}
