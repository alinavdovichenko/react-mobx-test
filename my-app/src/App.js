import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import HomePage from './pages/HomePage';
import { authStore } from './stores/AuthStore';
import { companyStore } from "@/stores/CompanyStore";
const App = observer(() => {
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        const init = async () => {
            try {
                await authStore.login('USERNAME');
                await companyStore.fetchCompany('12');
                await companyStore.fetchContact('16');
                setIsInitialized(true);
            }
            catch (e) {
                console.error('Ошибка инициализации:', e);
            }
        };
        init();
    }, []);
    if (!isInitialized || companyStore.loading) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }) }));
});
export default App;
