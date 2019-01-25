

2.
![](images/more-profile-api-routes-1.png)
- we don't have key and we don't care whether key is expired or not because in "localhost:5000/api/profile/johndoe", we allow everyone to see the profile
- and now we have a public API route to get a profile by the handle
![](images/more-profile-api-routes-2.png)
- if i put something that doesn't exist like johndoes, we get "There is no profile for this user"
![](images/more-profile-api-routes-3.png)
![](images/more-profile-api-routes-4.png)
- we should be able to also get the profile by user_id
![](images/more-profile-api-routes-5.png)
- if i add wrong things, then we get errors coming from the mongoose error
- i will just leave this as the error. we could put our custom error
![](images/more-profile-api-routes-6.png)
![](images/more-profile-api-routes-7.png)
- mongoose error is coming from this 'err'.
- so what we could do is change 'err' like picture 7
![](images/more-profile-api-routes-8.png)
- the result is here
![](images/more-profile-api-routes-9.png)
- now we have only have 1 profile. So if we want we do have 2 users, we have the Brad user, then we can create profile for him
![](images/more-profile-api-routes-10.png)
![](images/more-profile-api-routes-11.png)
- we change old token to new token 
![](images/more-profile-api-routes-12.png)
![](images/more-profile-api-routes-13.png)
- and add more things. and you can see it includes everything i added including all the social object, skill, bio
![](images/more-profile-api-routes-14.png)
- now we have 2 profile
