import { User } from './user.model';
import { Reply } from './reply.model';

export interface Post {
    content: string,
    owner: string,
    likes?: number,
    replies?: [Reply]
}