import React from 'react';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import MenuBar from '../../components/MenuBar';
import ErrorComponent from '../../components/Error';
import {
  Backdrop,
  Breadcrumbs,
  Chip,
  CircularProgress,
  Container,
  Fab,
} from '@mui/material';
import { GetTodosDataOfMe } from '../../components/interface/index';
import { GET_TODOS } from '../../graphql/queries/getMyTodos';
import AddIcon from '@mui/icons-material/Add';
import { Checklist, HomeFilled } from '@mui/icons-material';
import TodoCard from './../../components/ToDoCard';

const MyTodos = () => {
  const { data, loading, error } = useQuery<GetTodosDataOfMe>(GET_TODOS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  });

  const navigate = useNavigate();

  if (loading)
    return (
      <Backdrop open={loading} sx={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <MenuBar pages={['Home', 'My Todos']} settings={['Logout']} />
      <RouteLink to={`/todo/add`}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 30, right: 30 }}
        >
          <AddIcon />
        </Fab>
      </RouteLink>
      <Container>
        <h2>My Todo</h2>
        <Breadcrumbs>
          <Chip
            icon={<HomeFilled />}
            onClick={() => navigate('/')}
            label="Home"
            sx={{ cursor: 'pointer' }}
            color="primary"
          />
          <Chip label="Todo" sx={{ cursor: 'pointer' }} />
          <Chip
            label="My Todo"
            icon={<Checklist />}
            sx={{ cursor: 'pointer' }}
          />
        </Breadcrumbs>
        {error && (
          <ErrorComponent
            errorHeading="Something Went Wrong"
            errorMesage={error?.['message']}
            primaryCta="Back to Home"
            primaryFunc={() => navigate('/')}
            secondaryCta="Reload this page"
            secondaryFunc={() => navigate(0)}
          />
        )}
        {(data?.todosByMe ?? []).map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </Container>
    </>
  );
};

export default MyTodos;
