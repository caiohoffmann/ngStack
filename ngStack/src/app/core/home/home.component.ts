import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { environment } from '../../env/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: Object;
  myForm: FormGroup;
  mytags = ["Tech", "Food", "Art", "Angular"];
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhaW9AZ21haWwuY29tIiwiaWQiOiI1ZGFhNTcyMWIzNDM4OTdmYzAzMTVmMzkiLCJuYW1lIjoiQ2FpbyIsImlhdCI6MTU3MTUzMTQyMn0.P2fcGZSZfEECtXInuWrBbSAuKFYNTy50Kzl72NzPt4s";

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get('http://localhost:3000/homes', { headers: { "ngstackauth": this.token } }).subscribe(res => {
      // localStorage.setItem('data', JSON.stringify(res));
      this.homes = res;
    });
    this.myForm = this.fb.group({
      'title': ['', Validators.required],
      'tags': this.fb.array(this.mytags.map(x => !1))
    });
    this.myForm.valueChanges.subscribe((val) => {
      console.log(val);
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    const valueToStore = Object.assign({}, this.myForm.value, {
      tags: this.convertToValue('tags')
    });
    console.log(valueToStore);

    this.http.post(`${environment.appApi.baseUrl}/posts`, { title: valueToStore.title, tags: valueToStore.tags }, { observe: 'response', headers: { "ngstackauth": this.token } }).subscribe(res => {
      console.log(res)
    })

  }

  convertToValue(key: string) {
    return this.myForm.value[key].map((x, i) => x && this.mytags[i]).filter(x => !!x);
  }

}
