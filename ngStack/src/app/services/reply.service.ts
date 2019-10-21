import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Reply } from '../core/models/reply.model';
import { environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReplyServices {

    constructor(private http: HttpClient) { }
    postID: number;
    commentID: number;

    getAll(): Observable<Reply[]> {
        return this.http.get<Reply[]>(`${environment.appApi.baseUrl}/posts/${this.postID}/comments/${this.commentID}/replies/`
            , {});
    }
}