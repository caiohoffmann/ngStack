import { createAction, props } from '@ngrx/store';
import { PostEventTypes } from 'src/app/core/events/post.events';
import { Post } from 'src/app/core/models/post.model';

export const getAll = createAction(
    PostEventTypes.getAll
);

export const gotAll = createAction(
    PostEventTypes.gotAll,
    props<{ posts: Post[] }>()
);

export const createPost = createAction(
    PostEventTypes.createPost,
    props<{ post: Post }>()
);
export const createPostSuccess = createAction(
    PostEventTypes.createdPost,
    props<{ post: Post }>()
)

export const updatePost = createAction(
    PostEventTypes.createPost,
    props<{ post: Post }>()
);
export const updatePostSuccess = createAction(
    PostEventTypes.createdPost,
    props<{ post: Post }>()
)

export const deletePost = createAction(
    PostEventTypes.createPost,
    props<{ id: string }>()
);
export const deletePostSuccess = createAction(
    PostEventTypes.createdPost,
    props<{ post: Post }>()
)