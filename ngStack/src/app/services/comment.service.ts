import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentsComponent } from '../core/comments/app.comments';
import { environment } from '../env/environment';

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhaW9AZ21haWwuY29tIiwiaWQiOiI1ZGFhNTcyMWIzNDM4OTdmYzAzMTVmMzkiLCJuYW1lIjoiQ2FpbyIsImlhdCI6MTU3MTUzMTQyMn0.P2fcGZSZfEECtXInuWrBbSAuKFYNTy50Kzl72NzPt4s"
    constructor(private http: HttpClient) { }

    getComments(id_post: string): Observable<any> {
        return this.http.get(`${environment.appApi.baseUrl}/posts/5dad0bdf4ed73e3a6086f4b2/comments`, {
            headers: { 'ngstackauth': this.token }
        });
    }

    //  //    return this.http.post<any>(this._loginUrl, user);
    //sendComment(id_post: string, comment: Comment): Observable<Comment> {
    sendComment(id_post: string, comment) {

        var postcontent = {
            "comment": "Bon An gade saa ",
            "owner": "Ralph Laurent"
          }

        return this.http.post<any>(`${environment.appApi.baseUrl}/posts/${id_post}/comments`,postcontent
        ,{
            headers: { 'ngstackauth': this.token }
        });
    }
    //PUT http://localhost:3000/posts/5dad0bdf4ed73e3a6086f4b2/comments/5dad0f92a896688758101a47 http/1.1

    updateComment(id_post: string, comment: Comment): Observable<any> {
        return null;
        //return this.http.put<Comment>(`${environment.appApi.baseUrl}/posts/${id_post}/comments/${comment._id}`, { comment });
    }




}
