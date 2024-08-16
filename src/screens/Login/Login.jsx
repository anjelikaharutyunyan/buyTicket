import { useState } from 'react';

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import './styles.css'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitchToSignIn = () => {
    setIsSignUp(false);
  };
  const handleSwitchToSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <div className='container'>
      {isSignUp ? (
        <SignUp onSwitchToSignIn={handleSwitchToSignIn} />
      ) : (
        <SignIn onSwitchToSignUp={handleSwitchToSignUp} />
      )}
    </div>
  );
}
export default Login