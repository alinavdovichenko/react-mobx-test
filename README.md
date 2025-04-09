### Проект на стеке: React + Vite + Sass + Axios + React Router + MobX.

# интерфейс на React + MobX, который:

1. Авторизуется и получает токен.

2. Загружает данные организации и контактное лицо.

3. Позволяет редактировать эти данные и отправлять изменения.

4. Отображает актуальные данные после изменения.

5. Позволяет загружать и удалять изображения.

6. Позволяет удалить организацию.


REACT-MOBX-TEST/
│
├── animations/                 # Анимации (CSS или JS-анимации)
│
├── my-app/
│   ├── node_modules/           # Установленные зависимости Node.js
│   ├── public/                 # Публичные файлы
│   │   ├── fonts/              # Шрифты
│   │   ├── img/                # Изображения
│   │   └── favicon.svg         # Иконка сайта
│   └── src/                    # Исходный код приложения
│       ├── assets/            # Ресурсы (пока пустая папка, возможно будут изображения, иконки)
│       ├── components/        # Компоненты React
│       │   ├── Card/          # Подкомпоненты карточек
│       │   │   ├── CompanyDetailsCard.tsx
│       │   │   ├── ContactsCard.tsx
│       │   │   └── PhotosCard.tsx
│       │   ├── Buttons.tsx
│       │   ├── CustomMultiSelect.tsx
│       │   ├── CustomSelect.tsx
│       │   ├── Header.tsx
│       │   ├── Icon.tsx
│       │   ├── Layout.tsx
│       │   └── Sidebar.tsx
│       │
│       ├── pages/             # Страницы
│       │   └── HomePage.tsx
│       │
│       ├── stores/            # MobX сторы
│       │   └── companyStore.ts
│       │
│       ├── styles/            # SCSS стили
│       │   ├── base/          # Базовые стили
│       │   │   ├── _globals.scss
│       │   │   ├── _mixins.scss
│       │   │   └── _variables.scss
│       │   ├── components/    # Стили по компонентам
│       │   │   ├── _buttons.scss
│       │   │   ├── _card.scss
│       │   │   ├── _custom-select.scss
│       │   │   ├── _form.scss
│       │   │   ├── _header.scss
│       │   │   └── _sidebar.scss
│       │   └── main.scss      # Главный SCSS-файл
│       │
│       ├── type/              # Общие типы TypeScript
│       │   └── ButtonVariant.ts
│       │
│       ├── App.tsx           # Главный компонент приложения
│       ├── main.tsx          # Точка входа в приложение
│       └── vite-env.d.ts     # Типы для Vite
│
├── .gitignore                # Файл устранения из гита
├── eslint.config.js         # Конфигурация ESLint
├── index.html               # HTML-шаблон
├── package-lock.json
├── package.json             # Манифест npm проекта
├── README.md                # Документация проекта
├── tsconfig.app.json        # TS конфигурация для приложения
├── tsconfig.json            # Общая TS конфигурация
├── tsconfig.node.json       # TS конфигурация для Node.js
└── vite.config.ts           # Конфигурация сборщика Vite

src/
│
├── api/
│   └── api.ts
│   └── token.ts
│   └── process-error-handle.ts
│
├── stores/
│   └── AuthStore.ts
│   └── CompanyStore/
│       └── index.ts           ← экспорт основного store
│       └── CompanyStore.ts    ← MobX логика
│       └── company.api.ts     ← чистые API-функции
│   └── ErrorStore.ts
│
├── types/
│   └── CompanyType.ts
│   └── ContactType.ts
