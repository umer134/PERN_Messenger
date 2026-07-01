import * as s from './message-context-menu.css';
import { MessageAction } from '../model/message-actions.types';
import { useTranslation } from 'react-i18next';

type Props = {
  canEdit: boolean;

  onAction: (action: MessageAction) => void;
};

export const MessageContextMenu = ({ canEdit, onAction }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className={s.root}>
      <button className={s.item} onClick={() => onAction('reply')}>
        {t('actions.reply')}
      </button>
      {canEdit && (
        <button className={s.item} onClick={() => onAction('edit')}>
          {t('actions.edit')}
        </button>
      )}

      <button className={s.item} onClick={() => onAction('copy')}>
        {t('actions.copy')}
      </button>

      {canEdit && (
        <button className={s.item} onClick={() => onAction('delete')}>
          {t('actions.delete')}
        </button>
      )}
    </div>
  );
};
