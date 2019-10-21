import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentsComponent } from '../core/comments/app.comments';
import { environment } from '../env/environment';


@Injectable({
    providedIn: 'root'
})

export class CommentService {

    constructor(private http: HttpClient) { }


    getComments(id_post: string): Observable<any> {

        return this.http.get<any>(`${environment.appApi.baseUrl}/posts/5dad0bdf4ed73e3a6086f4b2/comments`);
    }
    /*  "content": req.body.content,
                    "like": req.body.like,
                    "owner": req.body.owner,
                    "like": 0*/
    //POST http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments http/1.1

    sendComment(id_post: string, comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(`${environment.appApi.baseUrl}/posts/${id_post}/comments`, {
            comment
        });
    }
    //PUT http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments/5dad0f92a896688758101a47 http/1.1

    updateComment(id_post: string, comment: Comment): Observable<Comment> {
        return this.http.put<Comment>(`${environment.appApi.baseUrl}/posts/${id_post}/comments/${comment._id}`, { comment });
    }




}
