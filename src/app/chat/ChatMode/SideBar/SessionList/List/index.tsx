import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'lodash-es/isEqual';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

import SessionItem from './Item';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  filter?: string;
}

const SessionList = memo<SessionListProps>(({ filter }) => {
  const [sessionListIds, switchSession] = useSessionStore(
    (s) => [sessionSelectors.filterSessionListIds(s, filter), s.switchSession],
    isEqual,
  );

  const { styles } = useStyles();
  const { t } = useTranslation('chat');

  return (
    <>
      {sessionListIds.map((id) => (
        <LazyLoad className={styles} key={id}>
          <SessionItem id={id} onClick={() => switchSession(id)} />
        </LazyLoad>
      ))}
      {sessionListIds.length === 0 && (
        <Empty description={t('noSession')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
});

export default SessionList;
