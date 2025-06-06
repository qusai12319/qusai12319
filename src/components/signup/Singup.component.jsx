import { useState } from "react";
import { createUserDocumentFromAuth, createUserWithEmailAndPasswordAuth } from "../../utils/firebase/firebase.utils";
import "./signup.styles.scss";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Your passwords don't match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPasswordAuth(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Email already in use.');
          break;
        default:
          console.log('Sign-up error', error);
          break;
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          required
          label="Display name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          type="email"
          required
          label="Email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          type="password"
          required
          label="Password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          type="password"
          required
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
