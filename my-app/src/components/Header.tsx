
const Header = () => (
  <header className="header">
    <button className="header__back">
      <img src="/img/Chevron.svg" alt="Chevron" />
    </button>
    <h1 className="header__title">Eternal Rest Funeral Home</h1>
    <div className="header__actions">
      <button className="header__icon-btn">
        <img src="/img/Edit.svg" alt="Edit" />
      </button>
      <button className="header__icon-btn">
        <img src="/img/Trash.svg" alt="Trash" />
      </button>
    </div>
  </header>
)

export default Header
