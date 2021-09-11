import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Form from '../components/Form'
import TextInput from '../components/TextInput'
import { useAuth } from "../contexts/AuthContext"
import classes from '../styles/Signup.module.css'

const SignupForm = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState("")

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()
    // ? do validate
    if (password !== confirmPassword) {
      return setError("Passwords don't match!")
    }

    try {
      setError("")
      setLoading(true)
      await signup(email, password, username)
      history.push("/")
    } catch (err) {
      setLoading(false)
      setError("Failed to create an account!")
    }
  }

  return (
    <>
      <Form className={classes.signup} onSubmit={handleSubmit} >
        <TextInput
          type="text"
          placeholder="Enter name"
          icon="person"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextInput
          type="email"
          placeholder="Enter email"
          icon="alternate_email"
          required value={email}
          onChange={(email) => setEmail(email.target.value)}
        />

        <TextInput
          type="password"
          placeholder="Enter password"
          icon="lock"
          required value={password}
          onChange={(password) => setPassword(password.target.value)}
        />

        <TextInput
          type="password"
          placeholder="Confirm password"
          icon="lock_clock"
          required
          value={confirmPassword}
          onChange={(confirmPassword) => setConfirmPassword(confirmPassword.target.value)}
        />

        <Checkbox
          text="I agree to the Terms &amp; Conditions"
          required
          value={agree}
          onChange={(agree) => setAgree(agree.target.value)}
        />
        <Button type="submit" disabled={loading}>
          <span>Submit Now</span>
        </Button>

        {error && <p className={error}>{error}</p>}

        <div className="info">
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
      </Form>
    </>
  )
}

export default SignupForm
