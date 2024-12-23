import { ConfigProviderProps } from 'antd/es/config-provider';
import viVNIntl from 'antd/locale/vi_VN';

export const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      colorPrimary: CONFIG.theme.accentColor,
    },
  },
  locale: viVNIntl,
};
