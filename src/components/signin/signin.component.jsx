import { useState } from "react"
import { signInWithGooglePopup, signInWithEmailAndPasswordAuth } from "../../utils/firebase/firebase.utils"
import './signin.style.scss'
import FormInput from "../formInput/formInput.component"
import Button from "../button/button.component"

const defaultFormField = {
  email: '',
  password: ''
}

const Signin = () => {
  const [formFields, setFormFields] = useState(defaultFormField)
  const { email, password } = formFields

  const changesHandler = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFields = () => {
    setFormFields(defaultFormField)
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPasswordAuth(email, password)
      resetFields()
    } catch (error) {
      console.log("error signing in:", error.message)
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput type="email" label={"Email"} required onChange={changesHandler} name="email" value={email} />
        <FormInput type="password" label={"Password"} required onChange={changesHandler} name="password" value={password} />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
      </form>
    </div>
  )
}

export default Signin
