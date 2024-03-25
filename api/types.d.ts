export interface Message {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export type MessageWithoutId = Omit<Message, 'id'>;

export type MessageWithoutDate = Omit<MessageWithoutId, 'createdAt'>;