import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Wrapper, Form, List, FormDiv } from './TodoPage.styled';
import { createTodo, getOneTodo, updateTodo } from 'ApiService/ApiService';
import TodoItem from 'components/TodoItem';

const validationSchema = yup.object({
  title: yup.string('Enter title for Todo').required('Title is required'),
  description: yup
    .string('Enter description for Todo')
    .required('Description is required'),
});

const TodoPage = ({ data, reqFunc }) => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const updateFunc = async id => {
    await getOneTodo(id).then(({ data }) => {
      setTitle(data.task.title);
      setDiscription(data.task.description);
      setId(id);
    });
    setIsUpdating(true);
  };

  const formik = useFormik({
    initialValues: {
      title: title,
      description: discription,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
        if (isUpdating) {
            updateTodo({ ...values, id });
            actions.resetForm();
            setTitle('');
            setDiscription('');
            await reqFunc();
            setIsUpdating(false);
            return;
        } 
      await createTodo({ ...values });
      actions.resetForm();
      await reqFunc();
    },
  });
  return (
    <Wrapper>
      <FormDiv>
        <h2>Create your Todo</h2>
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            variant="standard"
            id="title"
            name="title"
            label="Title"
            style={{ width: '400px' }}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            variant="outlined"
            id="description"
            name="description"
            label="Description"
            multiline
            style={{ width: '400px', marginTop: '40px' }}
            minRows={5}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          {isUpdating ? (
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: 'orange', marginTop: '50px' }}
            >
              Update Todo
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: 'orange', marginTop: '50px' }}
            >
              Create Todo
            </Button>
          )}
        </Form>
      </FormDiv>
      <List>
        {data.map(({ id, title, description }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            description={description}
            reqFunc={reqFunc}
            updateFunc={updateFunc}
          />
        ))}
      </List>
    </Wrapper>
  );
};

export default TodoPage;
