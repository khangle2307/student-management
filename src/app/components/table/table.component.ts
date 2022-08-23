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
  student: InputForm = {
    fullName: '',
    age: 0,
    gender: '',
    major: '',
    avg: 0,
  }
  students?: Student[];
  constructor(
    private studentService: StudentService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents() {
    this.studentService.getALl().subscribe(data => {
      this.students = data;
      console.log(this.students);
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
