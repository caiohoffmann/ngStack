import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../core/models/comment.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersStoreFacade } from 'src/app/store/users/users.store-facade';
import { PostsStoreFacade } from 'src/app/store/posts/posts.store-facade';
import { faUserCircle, faClock, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { CommentsStoreFacade } from 'src/app/store/comments/comments.store-facade';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostsServices } from 'src/app/services/post.service';



@Component({
  selector: 'app-comments',
  templateUrl: './app.comments.html',
  styles: ['./app.comments.css']
})
export class CommentsComponent implements OnInit {

  config: any;

  faCoffee = faUserCircle;
  faClock = faClock;
  faComment = faComment;
  faThumbsUp = faThumbsUp;
  arrayComments: Observable<any>;
  comments_array: Object;
  myForm: FormGroup;
  comment_id: string;


  p: number = 1;
  public idPost: string;

  constructor(private _comment: CommentService, private formBuilder: FormBuilder, private user_facade: UsersStoreFacade, private _commentFacade: CommentsStoreFacade,
    private _route: ActivatedRoute, private _postService:PostsServices) {
    this.user_facade.login({ email: 'caio@mum.edu', password: '123' });

    this.user_facade.getToken().subscribe(
      t => {

        this._comment.getComments(this.idPost).subscribe(result => {
          this.comments_array = result;

          this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: 16
          };

        });
      }
    )
    this.veryfyForm();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }


  veryfyForm() {
    this.myForm = this.formBuilder.group({
      'comment': ['', [Validators.required, Validators.minLength(10)]]
    });
  }


  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idPost = params['idPost'];
      // console.log("Info " + this.idPost);

    })
  }

  onPostComment() {
    var postcontent: Comment = {
      content: this.myForm.get("comment").value,
      idPost: this.idPost
    }
    //this._commentFacade.createComment(postcontent);
  }

  //  //    likeReply(idPost: string, idComment:string): Observable<any> {
  onlikePost(event: Event) {
    this.comment_id = this.stoPropgation(event);
    this._comment.likeReply(this.idPost, this.comment_id).subscribe(res=>{
          console.log("On like Data " + res);
    });
   
   // console.log("Reply Is ok  " + this.comment_id);

  }


  onReplyComment(event: Event) {
    this.comment_id = this.stoPropgation(event);
    console.log("After Method Elem " + this.comment_id);
  }

  stoPropgation(event: Event): string {
    event.preventDefault();
    return (event.target as Element).id;
  }

}
