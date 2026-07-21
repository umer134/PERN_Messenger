import { MessageAttachmentVM } from '@/entities';

export const cleanupOptimisticAttachments = (
  attachments: MessageAttachmentVM[],
) => {
  attachments.forEach((att) => {
    if (att?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(att.url);
    }
  });
};
