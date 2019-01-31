- chapter 45
1. update
- authActions.js(actions folder)
- Navbar.js(components/layout folder)
- App.js (client colder)
- Login.js(components/auth folder)
- Register.js(components/auth folder)
- Landing.js(components/layout folder)

2.
![](images/logout-conditional-navbar-links-1.png)
- we have our logout here because we are actually still logged in
![](images/logout-conditional-navbar-links-2.png)
- if i click logout, you can see 'SET_CURRENT_USER' and remember it passed in that empty object which is then turned 'isAuthenticated' to false and get rid of all the user data
![](images/logout-conditional-navbar-links-3.png)
- this is the diff. if we look at the state, we go back to the default state
![](images/logout-conditional-navbar-links-4.png)
- if we try to log in, as soon as we login, the navbar changes to a logo.
- it set the current user and the user is now in the auth state
![](images/logout-conditional-navbar-links-5.png)
![](images/logout-conditional-navbar-links-6.png)
- if i go to '/login' being logging in, then go automatically '/dashboard'
![](images/logout-conditional-navbar-links-7.png)
- if we are logged in, we don't need to go to landing page
- so if i click DevConnector banner being login, then it push to '/dashboard'
