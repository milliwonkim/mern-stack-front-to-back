- chapter 34
1. update
- Register.js(components/auth folder) (from outside of devconnector_theme/register.html)

2.
![](images/creating-the-register-form-with-state-1.png)
- Register form is like this
![](images/creating-the-register-form-with-state-2.png)
- if i try to type in fields, i cannot type in anything because these have the value of those state values.</br>
we have to actually assign a change event to each input. change means when we start typing that's a change event
![](images/creating-the-register-form-with-state-3.png)
![](images/creating-the-register-form-with-state-4.png)
- after fixing onChange like "this.onChange = this.onChange.bind(this);", we can type in the fields
- and if you go see React tap of console on Chrome, then you can see, everytime we fill out fields, console also is filled with what we type in.
![](images/creating-the-register-form-with-state-5.png)
![](images/creating-the-register-form-with-state-6.png)
- so now we are seeing whatever i type in. it's in the state, it's getting put into that object once we push onSubmit</br>
and then it's just console loggin
