

2.
![](images/logout-conditional-navbar-links-1.png)
- we have our log out here because we are actually still logged in
![](images/logout-conditional-navbar-links-2.png)
- you can see 'SET_CURRENT_USER' and remember it passed in that empty object which is then turned 'isAuthenticated' to false
and get rid of all the user data
![](images/logout-conditional-navbar-links-3.png)
- this is the diff. if we look at the state, we go back to the default state
