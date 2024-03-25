import express, {Request, Response} from 'express';
import fileDb from '../fileDb';
import {MessageWithoutDate} from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req: Request, res: Response) => {
  const messages = await fileDb.getItems();
  const datetime = req.query.datetime as string;
  if (datetime) {
    const date = new Date(datetime);

    if (isNaN(date.getDate())) {
      return res.status(400).send({"error": "Datetime is wrong"});
    }

    const index = messages.findIndex(item => item.createdAt === datetime);

    if (index !== -1) {
      const newMessages = messages.slice(index + 1, index + 31);
      return res.json(newMessages);
    } else {
      return res.status(400).send({"error": "Datetime is wrong"});
    }
  } else {
    return res.json(messages.slice(-30));
  }
});

messagesRouter.post('/', async (req: Request, res: Response) => {
  const author = req.body.author;
  const message = req.body.message;

  if (author && message && author.trim().length !== 0 && message.trim().length !== 0) {
    const messageData: MessageWithoutDate = {
      author,
      message
    };
    await fileDb.addItem(messageData);

  } else {
    return res.status(400).send({"error": "Author and message must be present in the request"});
  }

});

export default messagesRouter;