import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import HomePage from './pages/HomePage';
import { authStore } from './stores/AuthStore';
import { companyStore } from './stores/CompanyStore';

const App = observer(() => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await authStore.login('USERNAME');     
        await companyStore.fetchCompany('12');     
        await companyStore.fetchContact('16');   
        setIsInitialized(true);
      } catch (e) {
        console.error('Ошибка инициализации:', e);
      }
    };

    init();
  }, []);

  if (!isInitialized || companyStore.loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
});

export default App;
