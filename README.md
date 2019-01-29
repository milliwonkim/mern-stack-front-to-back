- chapter 38
1. update
- Register.js(components/auth folder)

2.
![](images/error-handling-and-display-1.png)
![](images/error-handling-and-display-2.png)
![](images/error-handling-and-display-3.png)
- basically you want to check error, and if you want that field to have an error, then you want it to have a class of isInvalid like picture 1</br>
input should have class
![](images/error-handling-and-display-4.png)
![](images/error-handling-and-display-5.png)
- like picture 2, red outline is made if you type in "is-invalid" in your class. 
- and error message text underneath comes from a div with "invalid-feedback" as a class</br>
now this doesn't show by default, it only shows if you have isInvalid as a class on your input
![](images/error-handling-and-display-6.png)
- the react doesn't have anything by default to do that.
- so we have to install a package called "classnames" which allow us to have conditional class names
- at install, you make sure the terminal is in the client folder.
![](images/error-handling-and-display-7.png)
- if i submit without name, then we can see it's red
![](images/error-handling-and-display-8.png)
- this message is coming from our backend and is displayed on our frontend because we sent that along with the 400 response
![](images/error-handling-and-display-9.png)
- if i submit without filling fields, then we get all of our errors
![](images/error-handling-and-display-10.png)
- if i submit only filling name, then error of name is gone
![](images/error-handling-and-display-11.png)
- if i put in an e-mail, it doesn't an actual email, we are gonna get the HTML5 error message of email here
![](images/error-handling-and-display-12.png)
![](images/error-handling-and-display-13.png)
- if we don't want HTML5 error message of email, we can do like picture 12 "noValidate" on the <form> tag
![](images/error-handling-and-display-14.png)
- so error checking works perfectly
