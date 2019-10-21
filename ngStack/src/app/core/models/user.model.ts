import { Post } from './post.model';

export interface User {
    name: string,
    email: string,
    password: string,
    picture?: string,
    id?: string,
    token?: string,
    posts?: [Post]
}