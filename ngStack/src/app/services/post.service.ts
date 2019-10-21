import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../core/models/post.model';
import { environment } from '../env/environment';

@Injectable()
export class PostsServices {
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        console.log('service: ');
        return this.http.get<Post[]>(`${environment.appApi.baseUrl}/posts`);
    }

    createPost(post: Post): Observable<any> {
        return this.http.post<Post>(`${environment.appApi.baseUrl}/posts`, {
            post
        });
    }
}