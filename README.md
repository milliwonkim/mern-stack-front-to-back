- chapter 74
1. update
- CommentFeed.js(components/post folder)
- CommentItem.js(components/post folder)
- Post.js(components/post folder)
- postActions.js(actions folder)
- types.js(actions folder)
- errorReducer.js(reducers folder)

2.
![](images/comment-display-and-delete-1.png)
![](images/comment-display-and-delete-2.png)
![](images/comment-display-and-delete-3.png)
![](images/comment-display-and-delete-4.png)
- if i submit, all the errors goes away
- any time you see that happends where the errors are still there, just go ahead and dispatch clearErrors before you make your request 

3.
- i had trouble on deleting comments in single post. the deleting comments doesn't working. i just tried to find the problem in only client(front-end) field because these days i only focus on the front end. but the problem was on the backend. so i find the problem of leaving out parentheses in backend.
