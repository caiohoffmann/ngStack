import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../core/models/post.model';
import { environment } from '../env/environment';
import { UsersStoreFacade } from '../store/users/users.store-facade';

@Injectable()
export class PostsServices {
    headers = { ngstackauth: '' };
    constructor(private http: HttpClient, private userStoreFacade: UsersStoreFacade) {
        this.userStoreFacade.getToken().subscribe(t => {
            this.headers.ngstackauth = (t || '');
        });
    }

    getAll(): Observable<any> {
        return this.http.get(`${environment.appApi.baseUrl}/homes`);
    }

    createPost(postContent): Observable<any> {
        return this.http.post(`${environment.appApi.baseUrl}/posts`, postContent, { headers: this.headers });
    }

    updatePost(post: Post): Observable<any> {
        return this.http.put<Post>(`${environment.appApi.baseUrl}/posts/${post._id}`, {
            title: post.title, tags: post.tags
        }
            , { headers: this.headers });
    }

    getPost(id: string) {
        return this.http.get<Post>(`${environment.appApi.baseUrl}/posts/${id}`);
    }


    delete(id: string): Observable<any> {
        return this.http.delete<Post>(`${environment.appApi.baseUrl}/posts/${id}`, { headers: this.headers });
    }

    getHomePaged(page:number){
        return this.http.get(`${environment.appApi.baseUrl}/homes/${page}`);
    }
}