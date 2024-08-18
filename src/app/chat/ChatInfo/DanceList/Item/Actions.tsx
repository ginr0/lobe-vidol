import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';

interface ActionsProps {
  danceItem: Dance;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { danceItem, setOpen } = props;
  const { modal } = App.useApp();
  const { t } = useTranslation(['common', 'panel']);
  const [removeDanceItem] = useDanceStore((s) => [s.removeDanceItem]);

  const items: MenuProps['items'] = [
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: t('actions.unsubscribe', { ns: 'common' }),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          async onOk() {
            removeDanceItem(danceItem.danceId);
          },
          okText: t('actions.unsubscribe', { ns: 'common' }),
          cancelText: t('cancel'),
          title: t('dance.cancelAddPlay', { musicName: danceItem?.name, ns: 'panel' }),
        });
      },
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      onOpenChange={(open) => setOpen(open)}
      trigger={['click']}
    >
      <ActionIcon
        icon={MoreVertical}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
