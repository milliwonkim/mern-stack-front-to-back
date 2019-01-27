- chapter 23
1. update
- profile.js(routes/api folder)

2.
![](images/delete-education-and-experience-routes-1.png)
- grab id of profile/experience and copy and paste that in picture 3
![](images/delete-education-and-experience-routes-2.png)
- as you can see, now the test is gone
</br>------------------------------------------------------------------
![](images/delete-education-and-experience-routes-3.png)
- as the /profile/experience, we do copy id of profile/education and paste that like picture 4
![](images/delete-education-and-experience-routes-4.png)
- now the test is gone
</br>------------------------------------------------------------------
![](images/delete-education-and-experience-routes-5.png)
- we register new email 'test'
- and now we wanna add a profile for this user so we gonna have to log in to get the token
![](images/delete-education-and-experience-routes-6.png)
- we get the token and we wanna go to API profile
![](images/delete-education-and-experience-routes-7.png)
![](images/delete-education-and-experience-routes-8.png)
- fill out authorization and Body then we get result
![](images/delete-education-and-experience-routes-9.png)
- in mongoDB, we have Brad, johndoe, test user
- so we want to delete the test user which should delete the user and the profile.</br>
we can see we have his profile 
![](images/delete-education-and-experience-routes-10.png)
- so we want what we want to do is make sure we are logged in as the test user
- and we gonna make DELETE request to that API profile and that should delete both
- so we get "'success': true"
![](images/delete-education-and-experience-routes-11.png)
- The profile of test is now gone and users now only get 2 users
- this is now deleting this entire account the profile and the user
