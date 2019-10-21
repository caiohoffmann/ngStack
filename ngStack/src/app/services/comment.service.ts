import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import { Comment } from '../core/models/comment.model';
import { UsersStoreFacade } from '../store/users/users.store-facade';


@Injectable({
    providedIn: 'root'
})

export class CommentService {
    headers = { ngstackauth: '' };
    constructor(private http: HttpClient, private userFacade: UsersStoreFacade) {
        this.userFacade.getToken().subscribe(t => {
            this.headers.ngstackauth = t;
        })
    }


    getComments(id_post: string): Observable<any> {

        return this.http.get<any>(`${environment.appApi.baseUrl}/posts/5dad0bdf4ed73e3a6086f4b2/comments`);
    }
    /*  "content": req.body.content,
                    "like": req.body.like,
                    "owner": req.body.owner,
                    "like": 0*/
    //POST http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments http/1.1

    sendComment(comment: Comment): Observable<any> {
        return this.http.post<any>(`${environment.appApi.baseUrl}/posts/${comment.idPost}/comments`, {
            content: comment.content
        }, { headers: this.headers });
    }
    //PUT http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments/5dad0f92a896688758101a47 http/1.1

    updateComment(id_post: string, comment: Comment): Observable<any> {
        return null;
        //return this.http.put<Comment>(`${environment.appApi.baseUrl}/posts/${id_post}/comments/${comment._id}`, { comment });
    }




}
