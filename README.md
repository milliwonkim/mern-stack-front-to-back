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
</br>----------------------------------------------------------------------------
https://developer.fortnox.se/blog/proptypes-in-react-js/
##PropTypes in React.js
Joachim Bachstätter Joachim Bachstätter  17 February 2015

A React.js application is created by lots of components. These components get many specific attributes, just like a HTML tag does.
These attributes are called ”props” in React and can be of any type. It can be a string, function or an Array, as long as its valid javascript you can use it as a prop.


< MyComponent position="fixed" size={24}/> 
//position & size is props made up by the  author of that component.
//Using anything other than a string you need to wrap your props in {}

This flexibility is awesome but could also cause some problems. If I’m using a component written by another developer I have to figure out what props that component want, what’s required and also the correct type. React has a solution for this and its called propTypes. PropTypes defines type and which props are required. This benefits the future you and other developer using your component in two ways:

1. You can easily open up a component and check which props are required and what type they should be.
2. When things get messed up React will give you an awesome error message in the console, saying which props is wrong/missing plus the render method that caused the problem.

So how do we write these propTypes?

<code><pre>
propTypes: {
  size: React.PropTypes.number,
  position: React.PropTypes.string.isRequired
}
</pre></code>

As you can see React gives us defined propTypes. You can check them all out at: http://facebook.github.io/react/docs/reusable-components.html

When looking at that link you’ll spot a few other cool things. Say our position prop must have a value of ”fixed” or ”absolute”

<code><pre>
propTypes:{
     position: React.PropTypes.oneOf(['fixed', 'absolute'])
}
</pre></code>
And even more cool, if we can’t find a PropType that suits our needs we can write own with regex or shapes:

<code><pre>
propTypes: {
     email: function(props, propName, componentName) {
          if (!/emailRegex/.test(props[email])) {
               return new Error('Give me a real email!');
          }
     },
     user: React.PropTypes.shape({
                   name: React.PropTypes.string.isRequired,
                   age: React.PropTypes.number
           }).isRequired
}
</pre></code>
Lastly I wanted to show you how a error message look like:

warning
Thats all for now, take care!
