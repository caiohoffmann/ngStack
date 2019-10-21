import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormBuilder, Validators,FormControl,FormArray} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: Object;
  myForm: FormGroup;
  mytags = ["Art", "Tech", "Food", "Angular"];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

    this.http.get('http://localhost:3000/homes', {headers:{"ngstackauth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzE1MzEyOTh9.Ihtu4elMUcxb9e37VQk9oYxpyoohJwPfoBkQNgS0qWU"}}).subscribe(res=>{
      // localStorage.setItem('data', JSON.stringify(res));
      this.homes = res;
    })

    this.myForm = formBuilder.group({
      'title':['', Validators.required],
      'tags': this.addtagscontroller()
    })
    this.myForm.valueChanges.subscribe((val)=>{
      console.log(val);
    })
   }

  addtagscontroller(){
    const arr = this.mytags.map(ele=>{
      return this.formBuilder.control(false);
    })
  }

  get TagsArray(){
    return <FormArray>this.myForm.get('tags');
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.myForm)
  }

}
