import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import EditOffIcon from '@mui/icons-material/EditOff';
import type { ChipProps } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { Todo } from './../interface/index';

interface TodoProps {
  todo: Todo;
}

const TODO_STATUS = {
  created: 'Created',
  progress: 'In-Progress',
  pending: 'Pending',
  completed: 'Completed',
};

const TODO_COLOR: Record<string, ChipProps['color']> = {
  created: 'primary',
  progress: 'info',
  pending: 'warning',
  completed: 'success',
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const options: object = {
    month: 'long', // September
    day: 'numeric', // 14
    year: 'numeric', // 2016
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // 12-hour format with AM/PM
  };

  return date.toLocaleString('en-US', options).replace(' ', ', ');
}

export default function TodoCard({ todo }: Readonly<TodoProps>) {
  return (
    <Card key={todo.id} sx={{ mb: 2, mt: 2 }}>
      <CardHeader
        avatar={<Avatar>{todo.createdBy.email.charAt(0)}</Avatar>}
        title={todo.createdBy.email}
        subheader={`Created At: ${formatDate(Number(todo.createdAt))}`}
        sx={{ borderBottom: '1px solid #eee' }}
      ></CardHeader>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todo.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary' }}
          dangerouslySetInnerHTML={{ __html: todo.description }}
        />
      </CardContent>
      <CardActions disableSpacing>
        {todo.createdBy.email === localStorage.getItem('email') ? (
          <RouteLink to={`/todo/edit/${todo.id}`}>
            <Tooltip title="Edit Todo">
              <IconButton aria-label="Edit Todo">
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          </RouteLink>
        ) : (
          <Tooltip title="Editing of this todo is not allowed">
            <IconButton aria-label="Todo is not Editable">
              <EditOffIcon />
            </IconButton>
          </Tooltip>
        )}
        <Chip
          label={TODO_STATUS[todo.status]}
          color={TODO_COLOR[todo.status]}
        />
      </CardActions>
    </Card>
  );
}
