import { User } from './user.model';
import { Reply } from './reply.model';
import { Comment } from './comment.model';

export interface Post {
    title: string,
    owner?: string,
    likes?: number,
    comments?: Comment[],
    tags?: String[],
    _id?: string,
    date?: Date
}