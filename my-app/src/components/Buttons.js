import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ Icon, text, variant, onClick }) => {
    return (_jsxs("button", { className: variant, onClick: onClick, children: [_jsx(Icon, {}), text] }));
};
