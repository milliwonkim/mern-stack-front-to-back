- chapter 22
1. update
- profile.js(routes/api folder)
- experience.js(validation folder)
- educations.js(validation folder)

2.
![](images/add-experience-and-education-routes-1.png)
![](images/add-experience-and-education-routes-2.png)
- we grab the authorization header and take token then we will go to new tab for "locahost:5000/api/profile/experience"
![](images/add-experience-and-education-routes-3.png)
- and for the form-urlencoded of body, we get errors and these errors will show up in the front end when we buld our react application
![](images/add-experience-and-education-routes-4.png)
![](images/add-experience-and-education-routes-5.png)
- it gives us our profile back and check that out in the experience array. current is false because we didn't set it current
- each experience has its own user_id
</br>-----------------------------------------------------------------------
![](images/add-experience-and-education-routes-6.png)
![](images/add-experience-and-education-routes-7.png)

3.
i fixed the problem thanks to Christopher</br>

i switched from 'techguyinfo@gmail.com' to 'john@gmail.com'</br>

and then take new token and do 'POST' both(/experience, /education)</br>

after that, i got results as the instructor had.</br>

this is based on what i typed has no error</br>
</br>


Christopher · 3달 전

Hi Guys, I had the same issue and it's a pretty simple solution.  This is a Facepalm worthy one.



You have to login as a user that has a profile.  If you're logged in as a user with no profile, profile returns NULL.
