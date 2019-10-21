import { User } from './user.model';
import { Reply } from './reply.model';

export interface Post {
    title: string,
    owner?: string,
    likes?: number,
    replies?: [Reply],
    tags?: [String],
    id?: string
}