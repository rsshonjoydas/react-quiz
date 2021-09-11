import React from 'react'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Form from '../components/Form'
import TextInput from '../components/TextInput'
import classes from '../styles/Signup.module.css'

const SignupForm = () => {
  return (

    <>
      <Form className={classes.signup} >
        <TextInput type="text" placeholder="Enter name" icon="person" />
        <TextInput type="email" placeholder="Enter email" icon="alternate_email" />
        <TextInput type="password" placeholder="Enter password" icon="lock" />
        <TextInput type="password" placeholder="Confirm password" icon="lock_clock" />

        <Checkbox text="I agree to the Terms &amp; Conditions" />
        <Button><span>Submit Now</span></Button>

        <div className="info">
          Already have an account? <a href="{#}">Login</a> instead.
        </div>
      </Form>
    </>
  )
}

export default SignupForm
