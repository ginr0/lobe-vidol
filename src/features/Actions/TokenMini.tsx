import { Tooltip, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import useSessionContext from '@/hooks/useSessionContext';

const TokenMini = () => {
  const model = useSessionContext()?.sessionAgent?.model;

  const usedTokens = useCalculateToken();
  const { t } = useTranslation('features');
  const maxValue = OPENAI_MODEL_LIST.find((item) => item.id === model)?.tokens || 4096;

  return (
    <Tooltip title={t('token.useToken', { usedTokens, maxValue })}>
      <Typography.Text type={'secondary'}>
        {t('token.tokenCount')}: {usedTokens}
      </Typography.Text>
    </Tooltip>
  );
};
export default TokenMini;
