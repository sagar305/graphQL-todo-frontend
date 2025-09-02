import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../../components/MenuBar';
import ToggleBar from '../../components/ToggleBar';
import toggleOptions from '../../constant/loginToggleValue';
import rightImage from '../../assets/images/left-side.svg';
import leftImage from '../../assets/images/right-side.svg';
import './styles.scss';
import HorizontalLinearStepper from '../../components/Stepper';

const SignUp = () => {
  const [selectedToggleValue, setSelectedToggleValue] =
    React.useState('signup');
  const navigate = useNavigate();

  return (
    <>
      <MenuBar pages={['Login', 'Sign-up']} />
      <div className="container">
        <div className="left-side">
          <img src={leftImage} alt="left-image" width={'100%'} />
        </div>
        <div className="right-side">
          <img src={rightImage} alt="right-image" width={'100%'} />
        </div>
      </div>
      <div className="login-form">
        <h6>Welcome in ToDo Project</h6>
        <h3>Sign Up</h3>
        <ToggleBar
          defaultValue={selectedToggleValue}
          onChangeValue={(value: string) => {
            setSelectedToggleValue(value);
            navigate(`/${value}`);
          }}
          options={toggleOptions}
        />
        <HorizontalLinearStepper />
      </div>
    </>
  );
};

export default SignUp;
