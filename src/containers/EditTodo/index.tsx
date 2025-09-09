import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseRounded, EditOutlined, HomeFilled } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client/react';
import { EDIT_TODO } from '../../graphql/mutations//editTodo';
import { GET_TODO } from '../../graphql/queries/getTodo';
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
  Select,
  MenuItem,
} from '@mui/material';
import MenuBar from '../../components/MenuBar';
import ReactQuill from 'react-quill-new'; // ← use the new package
import 'react-quill-new/dist/quill.snow.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type FormValues = {
  name?: string;
  description?: string;
  status?: 'created' | 'pending' | 'progress' | 'completed';
  updateTodoId: string;
};

interface GetUpdateSuccessResponse {
  updateTodo: {
    id: string;
    name: string;
  };
}

interface GetTodoResponse {
  todo: {
    id: string;
    name: string;
    description: string;
    status: 'created' | 'pending' | 'progress' | 'completed';
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
  const [
    handleUpdate,
    { data: updateSuccess, loading: updatePending, error: updateFailed },
  ] = useMutation<GetUpdateSuccessResponse>(EDIT_TODO, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  });
  const { data, loading, error } = useQuery<GetTodoResponse>(GET_TODO, {
    variables: {
      todoId: useParams()?.todoId,
    },
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
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      status: 'created',
      updateTodoId: '',
    },
  });

  React.useEffect(() => {
    if (data !== undefined) {
      if (data.todo.id) {
        setValue('updateTodoId', data.todo.id);
      }
      if (data.todo.name) {
        setValue('name', data.todo.name);
      }
      if (data.todo.description) {
        setValue('description', data.todo.description);
      }
      if (data.todo.status) {
        setValue('status', data.todo.status);
      }
    }
  }, [data]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      await handleUpdate({ variables: data });
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (updateSuccess !== undefined) {
      setSuccessDialog(true);
    }
  }, [updateSuccess]);

  return (
    <>
      <Backdrop open={loading || updatePending} sx={{ zIndex: 100 }}>
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
              Todo Update Successfully
            </span>
            <IconButton>
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ padding: '10px' }}>{`${
              updateSuccess?.updateTodo?.name ?? 'Todo'
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
                }}
                variant="outlined"
              >
                Add More Changes
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
      <MenuBar pages={['Home', 'My Todos']} settings={['Logout']} />
      <Container>
        <h2>Edit Todo</h2>
        <Breadcrumbs>
          <Chip
            icon={<HomeFilled />}
            onClick={() => navigate('/')}
            label="Home"
            sx={{ cursor: 'pointer' }}
            color="primary"
          />
          <Chip
            label={`Edit ${data ? data.todo.name : 'Todo'}`}
            icon={<EditOutlined />}
            sx={{ cursor: 'pointer' }}
          />
        </Breadcrumbs>
        <Card sx={{ padding: 4, mt: 4 }}>
          {error && (
            <Alert color="error" variant="standard" sx={{ mb: 2, mt: 2 }}>
              {error.message}
            </Alert>
          )}
          {updateFailed && (
            <Alert color="error" variant="standard" sx={{ mb: 2, mt: 2 }}>
              {updateFailed.message}
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
            <FormControl variant="standard" fullWidth sx={{ mt: 4 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{
                  required: 'Status is required',
                }}
                render={({ field }) => (
                  <Select {...field} labelId="status-label" id="status-id">
                    <MenuItem value="created">Created</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                )}
              />
              {errors.status && (
                <span style={{ color: 'red', fontSize: 12 }}>
                  {errors.status.message}
                </span>
              )}
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              Update Todo
            </Button>
            <Button
              type="button"
              variant="outlined"
              sx={{ mt: 4, ml: 2 }}
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default AddTodo;
