export type ChatParticipant = {
    id: string;
    name: string;
    color?: string; 
    avatarUrl?: string;
    online: boolean;
  };
  
  export type Message = {
    senderUsername?: string
    createdAt?: string
    forumId: string;
    content: string;
    recipientEmail?: string
  };
  
  
  export type ChatRoomData = {
    id: string;
    name: string;
    description?: string;
    creator: string;
    participants: ChatParticipant[];
    messages: Message[];
    peopleCount: number;
    createdAt: Date;
  };
  