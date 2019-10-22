import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Reply } from '../core/models/reply.model';
import { environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';
import { UsersStoreFacade } from '../store/users/users.store-facade';
import { Comment } from '../core/models/comment.model';

@Injectable()
export class ReplyServices {

    headers = { ngstackauth: '' };
    constructor(private http: HttpClient, private userStoreFacade: UsersStoreFacade) {
        this.userStoreFacade.getToken().subscribe(t => {
            this.headers.ngstackauth = (t || '');
        });
    }

    getAll(comment: Comment): Observable<any> {
        return this.http.get<Reply[]>(`${environment.appApi.baseUrl}/posts/${comment.idPost}/comments/${comment._id}/replies/`
            , { headers: this.headers });
    }

    create(reply: Reply): Observable<any> {
        return this.http.post<Reply>(`${environment.appApi.baseUrl}/posts/${reply.idPost}/comments/${reply.idComment}/replies/`, {
            content: reply.content,
            likes: reply.likes
        }, { headers: this.headers });
    }
}