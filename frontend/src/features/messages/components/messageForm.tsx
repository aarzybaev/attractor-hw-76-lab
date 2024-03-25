import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { messageWithoutDate } from '../../../types';

interface Props {
  onSubmit: (item: messageWithoutDate) => void;
}
const MessageForm: React.FC<Props> = ({onSubmit}) => {
  const [formState, setFormState] = useState<messageWithoutDate>(
    {
    author: '',
    message: ''
  });
  const submitFormHandler = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    setFormState({
      author: '',
      message: ''
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container spacing={2}>
        <Grid item container direction="column" gap={2} xs>
          <Grid item xs>
            <TextField
              id="author"
              label="Author"
              value={formState.author}
              onChange={inputChangeHandler}
              name="author"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="message"
              label="Message"
              multiline={true}
              rows={3}
              value={formState.message}
              onChange={inputChangeHandler}
              name="message"
              required
            />
          </Grid>
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;