import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputForm, Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  student: InputForm = {
    fullName: '',
    age: 0,
    gender: '',
    major: '',
    avg: 0,
  }
  constructor(
    private studentService: StudentService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.studentService.getById(Number(id)).subscribe((data) => {
      this.student = data;
    })
  }


  onSubmit() {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.updateById(this.student).subscribe((data) => {
        console.log(data);
        alert("Cập nhật thành công!");
        this.router.navigateByUrl("")
      })
    } else {
      this.studentService.create(this.student).subscribe((data) => {
        this.router.navigateByUrl("")
      })
    }

  }
}
