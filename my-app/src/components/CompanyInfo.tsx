import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/AuthStore';
import { companyStore } from '../stores/CompanyStore';

const CompanyInfo = observer(() => {
  useEffect(() => {
    const init = async () => {
      await authStore.login('USERNAME');
      await companyStore.fetchCompany(12);
      console.log('Компания:', companyStore.company);
    };

    init();
  }, []);

  if (companyStore.loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Информация об организации</h2>
      {companyStore.company ? (
        <pre>{JSON.stringify(companyStore.company, null, 2)}</pre>
      ) : (
        <p>Нет данных об организации</p>
      )}
    </div>
  );
});

export default CompanyInfo;
