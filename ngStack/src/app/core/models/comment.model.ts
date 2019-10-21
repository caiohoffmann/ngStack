import { Reply } from './reply.model';

export interface Comment {
    content?: string,
    like?: number,
    owner?: string,
    updated?: Date,
    replies?: Reply[],
    _id?: string,
    idPost?: string
}