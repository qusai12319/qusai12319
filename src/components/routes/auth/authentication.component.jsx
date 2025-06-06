
import SignUpForm from "../../signup/Singup.component";
import Signin from "../../signin/signin.component";
import './authentication.styles.scss'
const Authentication = () => {

 

  return (
    <div className="authentication-container">
      <Signin/>
      <SignUpForm />
    </div>
  );
};

export default Authentication;
