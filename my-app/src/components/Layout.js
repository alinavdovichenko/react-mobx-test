import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from './Sidebar';
import Header from './Header';
const Layout = ({ children }) => (_jsxs("div", { className: "container", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "content", children: [_jsx(Header, {}), children] })] }));
export default Layout;
