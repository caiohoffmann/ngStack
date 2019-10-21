import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../core/models/comment.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-comments',
  templateUrl: './app.comments.html',
  styles: ['./app.comments.css']
})
export class CommentsComponent implements OnInit {

  arrayComments: Observable<any>;
  comments_array: Object;
  myForm: FormGroup;
  comment_id: string;

  constructor(private _comment: CommentService, private formBuilder: FormBuilder) {
    this.veryfyForm();
  }

  veryfyForm() {
    this.myForm = this.formBuilder.group({
      'comment': ['', [Validators.required, Validators.minLength(10)]]
    });
  }


  ngOnInit() {
    this._comment.getComments("5dad0bdf4ed73e3a6086f4b2").subscribe(result => {
      this.comments_array = result;
    });
  }


  onPostComment() {
    // console.log("Post Result " + this.myForm.get("comment").value);
    var postcontent = {
      "comment": this.myForm.get("comment").value,
      "owner": "Ralph Laurent"
    }
    console.log("Val Elem " + postcontent.comment);
    // this._comment.sendComment("5dad0bdf4ed73e3a6086f4b2", postcontent).subscribe(
    //   res => { console.log("Answer " + res.data) },
    //   err => { console.log("Error " + err) }
    // )
  }

  onlikePost(event: Event) {
    this.comment_id = this.stoPropgation(event);
  }


  onReplyComment(event: Event) {
    this.comment_id = this.stoPropgation(event);
    console.log("After Method Elem " + this.comment_id);
  }

  stoPropgation(event: Event): string {
    event.preventDefault();
    return (event.target as Element).id;
  }




  /* content?: string,
   like: number,
   owner: string,
   updated:Date,
  _id:string
  // this.comment_id = (event.target as Element).id;
  */

}
