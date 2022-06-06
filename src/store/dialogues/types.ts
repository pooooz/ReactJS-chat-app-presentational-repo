export type Message = {
  text: string;
  author: string;
};

export type MessageState = Message & {
  id: string;
};
