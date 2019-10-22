import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { environment } from '../../env/environment';
import { PostsServices } from 'src/app/services/post.service';
import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { ConcatSource } from 'webpack-sources';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes:any[];
  myForm: FormGroup;
  mytags = ["Tech", "Food", "Art", "Angular"];
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhaW9AZ21haWwuY29tIiwiaWQiOiI1ZGFhNTcyMWIzNDM4OTdmYzAzMTVmMzkiLCJuYW1lIjoiQ2FpbyIsImlhdCI6MTU3MTUzMTQyMn0.P2fcGZSZfEECtXInuWrBbSAuKFYNTy50Kzl72NzPt4s";
  tagsForm: FormGroup;
  page = 2;
  loadmoreButton:Boolean = true;

  //constructor
  constructor(private http: HttpClient, private fb: FormBuilder, private ps: PostsServices,private userFacade : UsersStoreFacade) {
    // this.http.get('http://localhost:3000/homes', { headers: { "ngstackauth": this.token } }).subscribe(res => {
    //   // localStorage.setItem('data', JSON.stringify(res));
    //   this.homes = res;
    // });
    this.userFacade.login({ email: 'caio@mum.edu', password: '123' });
    this.userFacade.getToken().subscribe(t => {
      
    });
    //Get All Posts from Service
    ps.getHomePaged(1).subscribe(res=>{
      this.homes = res.data;
    })

    this.myForm = this.fb.group({
      'title': ['', Validators.required],
      'tags': this.fb.array(this.mytags.map(x => !1))
    });

    // this.myForm.valueChanges.subscribe((val) => { })

    //For right sidebar form
    this.tagsForm = this.fb.group({
      'tags': this.fb.array(this.mytags.map(x => !1))
    })

    //Triggered when you choose topic from right sidebar
    // this.tagsForm.valueChanges.subscribe(val => {  })


      

      
  }

  ngOnInit() {
  }

  onSubmit() {
    const valueToStore = Object.assign({}, this.myForm.value, {
      tags: this.convertToValue('tags')
    });


    this.http.post(`${environment.appApi.baseUrl}/posts`, valueToStore, { observe: 'response', headers: { "ngstackauth": this.token } }).subscribe(res => {

      //fetch the data from server
      this.ps.getHomePaged(1).subscribe(res=>{
        this.homes = res.data;
        this.loadmoreButton = true;
      })
    })
  }

  onSubmit2() {
    this.loadmoreButton =false;
    //fills the tags array with tag name
    const valueToStore = Object.assign({}, this.tagsForm.value,{
      tags: this.convertToValue2('tags')
    });

    //Call to API to fetch posts tagged
    this.http.post(`${environment.appApi.baseUrl}/homes/tags`, valueToStore, { observe: 'response', headers: { "ngstackauth": this.token } }).subscribe(res => {
      this.homes = res.body.data;
    })
  }

  //fill tags array with value for new post
  convertToValue(key: string) {
    return this.myForm.value[key].map((x, i) => x && this.mytags[i]).filter(x => !!x);
  }
  //fill tags array with value for right sidebar
  convertToValue2(key: string) {
    return this.tagsForm.value[key].map((x, i) => x && this.mytags[i]).filter(x => !!x);
  }

  loadmore(){
    this.ps.getHomePaged(this.page).subscribe(res=>{
      this.page +=1;
      this.homes = [...this.homes, ...res.data];
      if(res.data.length<5) this.loadmoreButton=false;
    })
  }

}
