import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../../components/MenuBar';

const Home = () => {
  const [selectedToggleValue, setSelectedToggleValue] =
    React.useState('signup');
  const navigate = useNavigate();

  return (
    <>
      <MenuBar
        pages={['Home', 'My Todo']}
        settings={['Account Details', 'Logout']}
      />
    </>
  );
};

export default Home;
