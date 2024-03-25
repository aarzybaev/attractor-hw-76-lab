import { Message } from '../../../types';
import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  item: Message;
}
const MessageItem: React.FC<Props> = ({item}) => {
  return (
    <Grid item xs>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.author}
          </Typography>
          <Typography variant="body2">
            {item.message}
          </Typography>
        </CardContent>
        </Card>
    </Grid>
  );
};

export default MessageItem;