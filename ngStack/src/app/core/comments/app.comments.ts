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
import { Post } from '../models/post.model';
import { User } from '../models/user.model';



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
  //comments_array: Post;
  comment: Post;
  myForm: FormGroup;
  comment_id: string;
  user: Observable<User>;

  p: number = 1;
  public idPost: string;

  constructor(private _comment: CommentService, private formBuilder: FormBuilder, private user_facade: UsersStoreFacade, private _commentFacade: CommentsStoreFacade,
    private _route: ActivatedRoute, private _postService: PostsServices) {

    this.user = user_facade.getUser();
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
      this._postService.getPost(this.idPost).subscribe(result => {
        this.comment = result;
        console.dir(result);

        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: 16
        };

      });
    })
  }

  onPostComment() {
    var postcontent: Comment = {
      content: this.myForm.get("comment").value,
      idPost: this.idPost
    }
    this._comment.sendComment(postcontent);
    this.comment.comments = [...this.comment.comments, postcontent];
  }


  onlikePost(event: Event) {
    this.comment_id = this.stoPropgation(event);
    this._comment.likeReply(this.idPost, this.comment_id).subscribe(t => {
      var postcontent;
      let con;
      for (con of this.comment.comments) {

        if (con._id == this.comment_id) {
          postcontent = {
            content: con.content,
            idPost: this.idPost,
            like: parseInt(con.like) + 1,
            owner: con.owner,
            _id: con._id,
            date: con.date,
            replies: con.replies,
            updated: con.updated
          }
          console.dir(con);
          this.comment.comments[this.comment.comments.indexOf(con)] = postcontent;
        }
      }
      this._comment.likeReply(this.idPost, this.comment_id);
      this.comment.comments = [...this.comment.comments];
    })

  }


  onReplyComment(event: Event) {
    this.comment_id = this.stoPropgation(event);
  }

  stoPropgation(event: Event): string {
    event.preventDefault();
    return (event.target as Element).id;
  }

}
