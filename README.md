

2.
![](images/profile-field-validations-1.png)
- that's the route to actually create a profile or update a profile
- this is happening because of that validation file we created
![](images/profile-field-validations-2.png)
- we could just get the status and skills is required
![](images/profile-field-validations-3.png)
- we get that
![](images/profile-field-validations-4.png)
- we get profile back
- the stuff that we didn't include like bio, website, company is not here. it's not gonna be blank, it's not gonna be here</br>
which is what we want because those are not required
- skills is now an array because of that logic that we added
- this same route, we can actually update our profile with. So i can just go ahead and add to this route
![](images/profile-field-validations-5.png)
![](images/profile-field-validations-6.png)
- we get company "Edusoft"
- So we can use this to create profiles and update if i wanted to add
![](images/profile-field-validations-7.png)
- this is where the error should come in if this isn't URL
![](images/profile-field-validations-8.png)
- there's no error if it is URL
![](images/profile-field-validations-9.png)
- it gets added to the social object
![](images/profile-field-validations-10.png)
- facebook also put into the social object because that's how we constructed it in our model
</br>------------------------------------------------------------------------------------------
![](images/profile-field-validations-11.png)
- if we have a checking to get our profile data because before we didn't have one 
![](images/profile-field-validations-12.png)
- if we send, we can get our profile
![](images/profile-field-validations-13.png)
- if you wanna look at MongoDB, we have 2 collections now users and profiles
![](images/profile-field-validations-14.png)
![](images/profile-field-validations-15.png)
- now there' 2 users Brad and John Doe. we didn't create a profile for Brad so Brad doesn't have a profile</br>
so if we look in profiles there's only one document of John Doe
</br>------------------------------------------------------------------------------------------
![](images/profile-field-validations-16.png)
![](images/profile-field-validations-17.png)
- we don't have avatar and you don't see the name or the e-mail. actually we don't want the e-mail to show on the profile because these are gonna be public. but we do want the avatar in the name
- so what we have to do is go to get route and findOne and use populate() method
![](images/profile-field-validations-18.png)
- if we re-fetch our profile, then we have name and avatar
