import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('notFoundPage.message')}</h1>
  );
};

export default NotFoundPage;
