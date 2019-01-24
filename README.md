

2.
![](images/passport-jwt-authentication-strategy-1.png)
- that's perfect because we didn't send a token to access private route</br>
this is private, it's unauthorized without the token
![](images/passport-jwt-authentication-strategy-2.png)
- this is the valid login. that's why i got this.
![](images/passport-jwt-authentication-strategy-3.png)
![](images/passport-jwt-authentication-strategy-4.png)
- we will go back to where we are trying to access a protected route
- Notice that we are logging the payload from the token which has the ID the name the avatar</br>
and then it also adds on the expiration and this is the issued at time and this is the expiration
- So this is working perfectly
- you can see we are getting the payload from the token
![](images/passport-jwt-authentication-strategy-5.png)
- after doing passport.js, then it works well it says "success"
![](images/passport-jwt-authentication-strategy-6.png)
- the way we can access the user from that route instead of sending success if we wanna send the user</br>
the user is now in req.user
![](images/passport-jwt-authentication-strategy-7.png)
- we logged in with this tab and we got the token for this user
![](images/passport-jwt-authentication-strategy-8.png)
- then we tried to access a protected row. we first did it without the token you it was unauthorized</br>
then we added the correct token. and now it's responding with the user
- if this is out like "unauthorized", then re-send picture 7 "http://localhost:5000/api/users/login"
- now i'm not gonna keep this as our response because we don't wanna send like the password even though it's a hash</br>
we don't wanna send this back 
![](images/passport-jwt-authentication-strategy-9.png)
