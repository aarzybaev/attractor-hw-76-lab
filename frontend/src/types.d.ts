export interface ApiMessage {
  author: string;
  message: string;
  createdAt: string;
}

export interface Message extends ApiMessage{
  id: string;
}

export type messageWithoutDate = Omit<ApiMessage, 'createdAt'>;





