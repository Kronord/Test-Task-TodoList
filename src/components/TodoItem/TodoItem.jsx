import React from 'react';
import { Item, Text, ButtonBox } from './TodoItem.styled';
import { deleteTodo } from 'ApiService/ApiService';
import Button from '@mui/material/Button';

const TodoItem = ({ title, description, id, reqFunc, updateFunc }) => {
  return (
    <Item>
      <Text>Task: {title}</Text>
      <Text>Description: {description}</Text>
      <ButtonBox>
        <Button variant="contained" style={{ backgroundColor: 'orange' }} onClick={() => updateFunc(id)}>
          Edit
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: 'orange' }}
          onClick={async () => {
            await deleteTodo(id);
            await reqFunc();
          }}
        >
          Delete
        </Button>
      </ButtonBox>
    </Item>
  );
};

export default TodoItem;
