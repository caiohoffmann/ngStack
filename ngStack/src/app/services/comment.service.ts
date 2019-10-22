import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import { Comment } from '../core/models/comment.model';
import { UsersStoreFacade } from '../store/users/users.store-facade';
import { Post } from '../core/models/post.model';

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    headers = { ngstackauth: '' };
    constructor(private http: HttpClient, private userFacade: UsersStoreFacade) {
        this.userFacade.getToken().subscribe(t => {
            this.headers.ngstackauth = (t || '');
        })
    }

    getComments(id_post: string): Observable<Post> {
        console.log(`Get Data ${environment.appApi.baseUrl}/posts/${id_post}/comments`);
        // http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments
        return this.http.get<Post>(`${environment.appApi.baseUrl}/posts/${id_post}/comments`, {
            headers: this.headers
        });
    }


    sendComment(comment: Comment): Observable<any> {
        return this.http.post<any>(`${environment.appApi.baseUrl}/posts/${comment.idPost}/comments`, {
            content: comment.content
        }, { headers: this.headers });
    }


    likeReply(idPost: string, idComment: string): Observable<any> {
        return this.http.patch(`${environment.appApi.baseUrl}/posts/${idPost}/comments/${idComment}/like`,
            {}, { headers: this.headers });
    }



    updateComment(id_post: string, comment: Comment): Observable<any> {
        return null;
        //return this.http.put<Comment>(`${environment.appApi.baseUrl}/posts/${id_post}/comments/${comment._id}`, { comment });
    }




}
