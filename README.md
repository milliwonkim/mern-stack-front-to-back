- chapter 52
1. update
- CreateProfile.js(components/create-profile folder)

2.
![](images/create-profile-form-1.png)
- We make Profile Handle and options
![](images/create-profile-form-2.png)
- there's a company field now for the rest of these
![](images/create-profile-form-3.png)
![](images/create-profile-form-4.png)
![](images/create-profile-form-5.png)
- if you look at the state, we can see displaySocialInputs false. If i click 'Add Social Network Links',</br>
then you can see changes to true by click and again click that, then it goes back to false</br>
so this is actually toggling the state which is exactly what it should be doing
![](images/create-profile-form-6.png)
- there's no links shown here because by default, this displaySocialLinks is false. if i click this, displaySocialLinks changes to true, then it's dlsplaying them</br>
if i click it again, it should go back to false and it hides them again.
