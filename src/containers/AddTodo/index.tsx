import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddCircleOutlined,
  CloseRounded,
  HomeFilled,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { CREATE_TODO } from '../../graphql/mutations//createTodo';
import {
  Button,
  InputLabel,
  FormControl,
  Input,
  Breadcrumbs,
  Chip,
  Container,
  Card,
  Backdrop,
  CircularProgress,
  Alert,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
} from '@mui/material';
import MenuBar from '../../components/MenuBar';
import ReactQuill from 'react-quill-new'; // ← use the new package
import 'react-quill-new/dist/quill.snow.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type FormValues = {
  name: string;
  description: string;
};

interface CreationTodoResponse {
  createTodo: {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    createdBy: {
      email: string;
      id: string;
    };
  };
}

const AddTodo = () => {
  const [successDialog, setSuccessDialog] = React.useState(false);
  const navigate = useNavigate();
  const [handleCreation, { data, loading, error }] =
    useMutation<CreationTodoResponse>(CREATE_TODO, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  React.useEffect(() => {
    if (data !== undefined) {
      setSuccessDialog(true);
    }
  }, [data]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      await handleCreation({ variables: data });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {data && (
        <Dialog open={successDialog}>
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              columnGap: '20px',
              borderBottom: '1px solid #eee',
              padding: '10px',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircleOutlineIcon color="success" />
              Todo Added Successfully
            </span>
            <IconButton>
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ padding: '10px' }}>{`${
              data?.createTodo.name ?? 'Todo'
            } is added successfully. This is descriptive todo success message, so that we can confirm the width of dialog`}</Typography>
            <DialogActions
              sx={{
                display: 'flex',
                alignItems: 'right',
                justifyContent: 'right',
              }}
            >
              <Button
                onClick={() => {
                  setSuccessDialog(false);
                  navigate('/');
                }}
                color="primary"
                variant="contained"
              >
                Back to home Page
              </Button>
              <Button
                onClick={() => {
                  setSuccessDialog(false);
                  reset();
                }}
                variant="outlined"
              >
                Add more Todo
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
      <MenuBar pages={['Home', 'My Todos']} settings={['Logout']} />
      <Container>
        <h2>Add New To-Do</h2>
        <Breadcrumbs>
          <Chip
            icon={<HomeFilled />}
            onClick={() => navigate('/')}
            label="Home"
            sx={{ cursor: 'pointer' }}
            color="primary"
          />
          <Chip
            label="Add Todo"
            icon={<AddCircleOutlined />}
            sx={{ cursor: 'pointer' }}
          />
        </Breadcrumbs>
        <Card sx={{ padding: 4, mt: 4 }}>
          {error && (
            <Alert color="error" variant="standard" sx={{ mb: 2, mt: 2 }}>
              {error.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="title-id">Name of Todo</InputLabel>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title-id"
                    type="text"
                    error={!!errors.name}
                  />
                )}
              />
              {errors.name && (
                <span style={{ color: 'red', fontSize: 12 }}>
                  {errors.name.message}
                </span>
              )}
            </FormControl>
            <FormControl sx={{ my: 4 }} variant="standard" fullWidth>
              <Controller
                name="description"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.replace(/<(.|\n)*?>/g, '').trim() !== ''
                      ? true
                      : 'Description is required',
                }}
                render={({ field, fieldState }) => (
                  <>
                    <ReactQuill
                      id="description-id"
                      theme="snow"
                      placeholder="Enter description of To-Do"
                      value={field.value}
                      onChange={field.onChange}
                      style={{ height: '150px', marginBottom: '8px' }}
                    />
                    {fieldState.error && (
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '40px',
                        }}
                      >
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              Add Todo
            </Button>
            <Button
              type="button"
              variant="outlined"
              sx={{ mt: 4, ml: 2 }}
              onClick={() => reset()}
            >
              Reset
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default AddTodo;
