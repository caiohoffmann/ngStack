import { Component,OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import {CommentService } from '../../services/comment.service';
import {Comment} from '../../core/models/comment.model'


@Component({
  selector: 'app-comments',
  templateUrl: './app.comments.html',
  styles: ['./app.comments.css']
})
export class CommentsComponent implements OnInit{

  arrayComments:Observable<any>;
  convert_array: any[];

  constructor(private _comment:CommentService){}
  comments_array = [
    {
      "title": "Are You There, Vodka? It's Me, Chelsea",
      "tags": "Science",
      "date": "30/02/2019",
      "comments": [
        {
          "content": " 1 ext of the printing and typesetting industry",
          "like": 0,
          "replies": [
            {
              "content": "ext of the printing and typesetting industry",
              "likes": 5,
              "owner": "Caio HoffMan",
              "updated": "06/22/2019",
            },
            {
              "content": "2 ext of the printing and typesetting industry",
              "likes": 6,
              "owner": "John Vallon",
              "updated": "07/29/2019",
            }
          ],

          "owner": "Caio Owner",
          "updated": "06/22/2200"

        }]
    },

    {
      "title": "Special title treatment ",
      "tags": "Football",
      "date": "31/03/2029",
      "comments": [
        {
          "content": "6666ext of the printing and typesetting industry",
          "like": 8,
          "replies": [
            {
              "content": "ext of the printing and typesetting industry",
              "likes": 5,
              "owner": "Caio HoffMan",
              "updated": "06/22/2019",
            },
            {
              "content": "2 ext of the printing and typesetting industry",
              "likes": 6,
              "owner": "John Vallon",
              "updated": "07/29/2019",
            }
          ],

          "owner": "Caio Owner",
          "updated": "06/22/2200"

        }]
    },
  ]

  ngOnInit(){
    console.log("Is Called");
    // _comment
    //GET http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments http/1.1
    //{
    // "content":"message ",
    // "owner":"Caio Hoffman"
//new Comment()
    this._comment.getComments("5dad0bdf4ed73e3a6086f4b2")
     .subscribe(result=>{
         console.log("Result Info "+result);
     });
    
   
  }





}
