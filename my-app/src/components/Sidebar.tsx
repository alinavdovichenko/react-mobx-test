import {ContractorIcon, UserIcon, CompanyIcon} from './Icon';
import {Button} from './Buttons';
import {ButtonVariants} from '../type/ButtonVariant';

const Sidebar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <aside className="sidebar">
      {/* Левая вертикальная панель с иконками */}
      <div className="sidebar__left-bar">
        <div>
          <div className="sidebar__logo">
            <img src="/img/Oak_tree_logo.svg" alt="Logo" />
          </div>
          <div className="sidebar__icon-wrapper">
            <img src="/img/Company.svg" alt="Search" />
          </div>
          <div className="sidebar__icon-wrapper">
            <img src="/img/MagnifyingGlass.svg" alt="Search" />
          </div>  
        </div>
        <div>
          <div className="sidebar__line-top"></div>
          <div className="sidebar__icon-wrapper">
            <img src="/img/Settings.svg" alt="Settings" />
          </div>
          <div className="sidebar__icon-wrapper">
            <img src="/img/SignOut.svg" alt="Sign Out" />
          </div>
        </div>
      </div>

      {/* Основная часть сайдбара */}
      <div className="sidebar__main">
        <div className="sidebar__header">
          <div className="sidebar__logo-text">Oak Tree Cemetery</div>
          <div className="sidebar__role">Process Manager</div>
          <nav className="sidebar__nav">
            <Button Icon={CompanyIcon} text="Organizations" variant={ButtonVariants.Filled} />
            <Button Icon={ContractorIcon} text="Contractors" variant={ButtonVariants.Outline} />
            <Button Icon={UserIcon} text="Clients" variant={ButtonVariants.Outline} />
          </nav>
        </div>

        <footer className="sidebar__footer">
        All Funeral Services © 2015-{currentYear}
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
