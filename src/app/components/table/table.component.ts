import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputStudent, IStudent } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  student: InputStudent = {
    fullName: '',
    age: 0,
    gender: '',
    major: '',
    avg: 0,
  }
  studentDetail?: IStudent;
  students?: IStudent[];
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
    })
  }

  onSubmit(data: InputStudent) {
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
