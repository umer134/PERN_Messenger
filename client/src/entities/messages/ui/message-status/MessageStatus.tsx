import { Check, CheckCheck, Clock3 } from 'lucide-react';
import { TMessageStatus as status } from '../../model';

type Props = {
  status: status;
};

export const MessageStatus = ({ status }: Props) => {
  switch (status) {
    case 'sending':
      return <Clock3 size={12} />;

    case 'sent':
      return <Check size={12} />;

    case 'delivered':
      return <CheckCheck size={12} />;

    case 'read':
      return <CheckCheck size={12} />;

    default:
      return null;
  }
};
