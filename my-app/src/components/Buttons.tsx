import {ButtonVariants} from '../type/ButtonVariant';

interface ButtonProps {
    Icon: React.FC;
    text: string;
    variant: ButtonVariants;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ Icon, text, variant, onClick }) => {

    return (
        <button className={variant} onClick={onClick}>
            <Icon />
            {text}
        </button>
    );
};