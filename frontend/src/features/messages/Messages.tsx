import MessageForm from './components/messageForm';
import MessageItem from './components/MessageItem';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Message, messageWithoutDate } from '../../types';
import axiosApi from '../../axiosApi';
import dayjs from 'dayjs';

const Messages = () => {
  const [messagesState, setMessagesState] = useState<Message[]>([]);
  let dt = '';
  const fetchData = async () => {
    try {
      const {data} = await axiosApi('/messages?datetime=' + dt);

      if (data.length) {
        dt = data[data.length - 1].createdAt;
        setMessagesState(prevState => {
            const newArr = prevState.map(item => ({...item}));
            return [...newArr, ...data]
              .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setInterval(fetchData, 3000)
  }, []);


  const createMessage = async (message: messageWithoutDate) => {
    try {
      await axiosApi.post('/messages', message);
    } catch (e) {
      console.error(e);
    }
  };

  const onFormSubmit = async (item: messageWithoutDate) => {
    if (item.author.trim() && item.message.trim()) {
      try {
        await createMessage(item);
      } catch (e) {
        console.error(e);
      }
    } else {
      window.alert('White spaces not allowed!');
    }

  };

  return (
    <>
      <MessageForm onSubmit={onFormSubmit}/>
      <Grid item container direction="column" gap={2} sx={{mt: 2}} xs={6}>
      {messagesState.map(item => (
        <MessageItem
          key={item.id}
          item={item}
        />
      ))}
      </Grid>
    </>
  );
};

export default Messages;