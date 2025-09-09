import React, { useEffect } from 'react';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import MenuBar from '../../components/MenuBar';
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Fab,
} from '@mui/material';
import { Todo, GetTodosData } from './../../components/interface/index';
import { GET_TODOS } from './../../graphql/queries/getAllTodos';
import AddIcon from '@mui/icons-material/Add';
import { HomeFilled } from '@mui/icons-material';
import ErrorComponent from '../../components/Error';
import TodoCard from './../../components/ToDoCard';

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [loadMore, setLoadMore] = React.useState(true);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const { data, loading, error, fetchMore } = useQuery<GetTodosData>(
    GET_TODOS,
    {
      variables: { page: page },
      notifyOnNetworkStatusChange: true,
    }
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      setTodos([...todos, ...(data?.todos ?? [])]);
    }
  }, [data]);
  console.log(data);

  const handleLoading = async () => {
    if (!loadMore || loading) return;

    const nextPage = page + 1;

    const { data: moreData } = await fetchMore({
      variables: { page: nextPage },
    });

    // if backend always returns fixed limit, check if we got less than that
    if ((moreData?.todos ?? [])?.length < 10) {
      setLoadMore(false);
    }

    setPage(nextPage);
  };

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <h2>Hello User</h2>
        <Breadcrumbs>
          <Chip
            icon={<HomeFilled />}
            label="Home"
            sx={{ cursor: 'pointer' }}
            color="primary"
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
        {(todos ?? []).map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
        {data && loadMore && (
          <Button
            onClick={handleLoading}
            color="primary"
            variant="contained"
            sx={{ width: '100%', mb: 4 }}
          >
            Load More
          </Button>
        )}
      </Container>
    </>
  );
};

export default Home;
