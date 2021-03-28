# Сборка

Сборка для нового проекта

## Описание

Это готовая копия сборки нового проекта на основе Gulp для локальной разработки (вёрстка/frontend).

## Установка и запуск

```
npm install
```

Для запуска среды с автоперезагрузкой в браузере:

```
npm start
```
Все что находится в `dev` будет собрано и скомпилировано в папку `build`:

```
build/
    └── css/
    |   └── fonts
    |       └── font.woff
    |       └── font.woff2
    │   └── animate.css
    │   └── styles.scss
    └── img/
    │   └── favicon.ico
    │   └── logo.png
    │   └── no-ava.png
    └── js/
    │   └── main.js
    └── index.html
```

*Папку `build` можно удалять в любой момент, так как она будет заново создана при вызове `npm start`.*

### Дерево проекта

**Работаем только в папке dev**. Все создаваемые и сохраняемые файлы отслеживаются сборщиком и при необходимости будут скомпилированы и перенесены в `build`. Страница в браузере перезагрузится автоматом.

```
dev/
    └── images/
    │   └── favicon.ico
    │   └── logo.png
    │   └── no-ava.png
    └── js/
    │   └── main.js
    └── styles/
    │   └── components/
    │   │   └── logo.scss
    │   └── variables/
    │   │   └── _animations.scss
    │   │   └── _break-points.scss
    │   │   └── _colors.scss
    │   │   └── _dev.scss
    │   │   └── _fonts.scss
    │   │   └── _mixins.scss
    │   │   └── _settings.scss
    │   │   └── _times.scss
    │   └── views/
    │   │   └── landing-page.scss
    │   └── animate.css
    │   └── styles.scss
    └── index.html
.eslintrc.json
.gitignore
.gitlab-ci.yml
.gitmodules
.jshintignore
.jshintrc
.sass-lint.yml
gulpfile.js
package.json
README.md
```

## Разработка
### Вёрстка
Для вёрстки макетов используем [шаблонизатор PUG](https://pugjs.org/api/getting-started.html). Сборка следит за шаблонами в папке `templates` и перезагружает браузер.
### Стили
Стили в проекте описываются по [методологии БЭМ](https://ru.bem.info/methodology/quick-start/). Используется [препроцессор SCSS](https://sass-scss.ru/documentation/).
### Сетка
Для сетки можно использовать smart-grid. Это адаптивная настраиваемая сетка на флексах.
1. Создаём файл инициализации для генерации сетки: `smart-grid-config.js`
```
var smartgrid = require('smart-grid');
/* Настройки генерации */
var settings = {
    outputStyle: 'scss',      /* less || scss || sass || styl */
    columns: 12,              /* количество колонок */
    offset: '30px',           /* межколоночный интервал: px || % || rem */
    mobileFirst: false,       /* для @media: mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1920px',   /* максимальная ширина */
        fields: '30px'        /* поля по краям */
    },
    breakPoints: {
        lg: {
            width: '1280px',  /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px'    /* переназначение полей на любом брейкпоинте */
        },
        xs: {
            width: '560px'
        }
        /*
        Можно добавлять ещё брейкпоинты

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};
smartgrid('./path-to-your-folder', settings);
```

2. Генерируем файл `smart-grid.scss` командой
```
node smart-grid-config.js
```
После успешной генерации появится файл `smart-grid.scss`, а в консоли появится:
```
Grid length is 11223 :)
Its work! Good day!
```

##### Работа со smart-grid

Файл `smart-grid.scss` — это набор миксинов.

Пример верстки карточек:
```
<!-- Блок товаров -->
<section class="products">

  <!-- Список карточек -->
  <ul class="products__list">

    <!-- Элемент списка -->
    <li class="products__item">

      <!-- Карточка -->
      <div class="card">
        <div class="card__title">Товар 1</div>
        <div class="card__content">
          <div class="card__image">
            <img src="http://placehol.it/120" alt="фото товара 1">
          </div>
          <p class="card__text">Lorem ipsum dolor sit amet.</p>
          <p class="card__price">100 руб.</p>
          <button class="card__btn">
            Купить
          </button>
        </div>
      </div>

    </li>

    ...

    <li class="products__item">
      ...
    </li>

  </ul>

</section>
```

Применяем сетку в стилях:
```
.products {

	@include wrapper(); // Контейнер-обертка с полями по краям

	&__list {
		@include row-flex(); // Обертка элементов с сеткой
	}

	@__item {
		@include col(); // Элемент сетки
		@include size(3); // Поместится 4 в ряд

		@include md-block { // Миксин для стилей на брейкпоинте md
			@include size(6); // Поместится 2 в ряд
		}
	}
}
```

### Шрифты

В проектах используем шрифты в форматах WOFF2 и WOFF.
Устанавливаем инструменты для конвертации через пакетный менеджер [Homebrew](https://brew.sh/index_ru):

```
brew tap bramstein/webfonttools
brew install woff2 sfnt2woff-zopfli
```

Конвертируем исходный шрифт `font.ttf`:

```
woff2_compress font.ttf
sfnt2woff-zopfli font.ttf
```

Результат:  
  + font.woff2  
  + font.woff

```
@font-face {
    font-family: 'Font';
    font-style: normal;
    font-weight: bold;
    src: url('font.woff2') format('woff2'),
         url('font.woff') format('woff');
}
```

Формат WOFF поддерживается всеми современными браузерами:
  + IE9+
  + Edge
  + Firefox 3.6+
  + Chrome 5+
  + Safari 5.1+
  + Opera 11.5+
  + iOS Safari 5+
  + Android Browser 4.4+
  + Все остальные мобильные браузеры кроме Opera Mini (Opera Mini не поддерживает пользовательские шрифты)

Формат WOFF2 поддерживается всеми современными браузерами, кроме Internet Explorer.
Преимущество WOFF2 в алгоритме сжатия без потерь. WOFF2 весит в среднем на 30% меньше.

### SVG спрайты

SVG-иконки, элементы управления лучше собирать в спрайты. SVG закидываются в папку `dev/img/svg-sprite`.

Пример:

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png) markdowm-icon.svg

```
<svg>
  <use href="/img/svg-sprite/sprite-svg#markdown-icon"></use>
</svg>
```

***

## Линтеры

Линтеры запускаются при попытке создать коммит.

#### Javascript

Линтер — `eslint`. Правила для линтера описаны в `.eslintrc.json`.

##### Правила для `.eslintrc`
```
{
  "env" : {
    "es6": true,
    "browser": true
  },
  "rules" : {
    "array-bracket-spacing": [2, "never"],
    "block-scoped-var": 2,
    "brace-style": [2, "1tbs"],
    "camelcase": 1,
    "computed-property-spacing": [2, "never"],
    "curly": 2,
    "eol-last": 2,
    "eqeqeq": [2, "smart"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "max-depth": [1, 4],
    "new-cap": 1,
    "no-extend-native": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-trailing-spaces": 2,
    "no-unused-vars": 1,
    "no-undef" : 2,
    "no-use-before-define": [2, "nofunc"],
    "object-curly-spacing": [2, "never"],
    "quotes": [2, "single", "avoid-escape"],
    "semi": [2, "always"],
    "keyword-spacing": [2, {"before": true, "after": true}],
    "space-unary-ops": 2
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": "eslint:recommended"
}
```


##### Стили
Стили линтятся по правилам в `.sass-lint.yml`

##### Правила для `.sass-lint.yml`
```
files:
  include: 'dev/styles/**/*.s+(a|c)ss'
  ignore:
    - 'node_modules/'
    - 'dev/commits/'
    - 'dev/styles/variables/normalize.scss'
options:
  formatter: stylish
  merge-default-rules: false
rules:
  bem-depth:
    - 0
    - max-depth: 1
  border-zero:
    - 1
    - convention: '0'
  brace-style:
    - 1
    - allow-single-line: true
  class-name-format:
    - 1
    - convention: strictbem
  clean-import-paths:
    - 1
    - filename-extension: false
      leading-underscore: false
  empty-line-between-blocks:
    - 1
    - ignore-single-line-rulesets: true
  extends-before-declarations: 1
  extends-before-mixins: 1
  final-newline:
    - 1
    - include: true
  force-attribute-nesting: 1
  force-element-nesting: 1
  force-pseudo-nesting: 0
  function-name-format:
    - 1
    - allow-leading-underscore: true
      convention: hyphenatedlowercase
  hex-length:
    - 1
    - style: short
  hex-notation:
    - 1
    - style: lowercase
  id-name-format:
    - 1
    - convention: hyphenatedlowercase
  indentation:
    - 1
    - size: 2
  leading-zero:
    - 1
    - include: true
  mixin-name-format:
    - 1
    - allow-leading-underscore: true
      convention: hyphenatedlowercase
  mixins-before-declarations: 1
  nesting-depth:
    - 1
    - max-depth: 6
  no-color-keywords: 1
  no-color-literals:
    - 1
    - allow-variable-identifiers: true
    - allow-map-identifiers: true
    - allow-rgba: false
  no-css-comments: 1
  no-debug: 1
  no-duplicate-properties: 1
  no-empty-rulesets: 1
  no-extends: 0
  no-ids: 1
  no-important: 0
  no-invalid-hex: 1
  no-mergeable-selectors: 1
  no-misspelled-properties:
    - 1
    - extra-properties: []
  no-qualifying-elements:
    - 1
    - allow-element-with-attribute: false
      allow-element-with-class: false
      allow-element-with-id: false
  no-trailing-zero: 1
  no-transition-all: 0
  no-url-protocols: 0
  no-vendor-prefixes:
    - 0
    - additional-identifiers: []
      excluded-identifiers: []
  placeholder-in-extend: 1
  placeholder-name-format:
    - 1
    - convention: hyphenatedlowercase
  property-sort-order:
    - 0
    - ignore-custom-properties: false
  property-units:
    - 1
    - global:
        - ch
        - em
        - ex
        - rem
        - cm
        - in
        - mm
        - pc
        - pt
        - px
        - q
        - vh
        - vw
        - vmin
        - vmax
        - fr
        - deg
        - grad
        - rad
        - turn
        - ms
        - s
        - Hz
        - kHz
        - dpi
        - dpcm
        - dppx
        - '%'
      per-property: {}
  quotes:
    - 1
    - style: single
  shorthand-values:
    - 1
    - allowed-shorthands:
        - 1
        - 2
        - 3
        - 4
  single-line-per-selector: 1
  space-after-bang:
    - 1
    - include: false
  space-after-colon:
    - 1
    - include: true
  space-after-comma:
    - 1
    - include: true
  space-before-bang:
    - 1
    - include: true
  space-before-brace:
    - 1
    - include: true
  space-before-colon: 1
  space-between-parens:
    - 1
    - include: false
  trailing-semicolon: 1
  url-quotes: 1
  variable-for-property:
    - 0
    - properties: []
  variable-name-format:
    - 1
    - allow-leading-underscore: true
      convention: hyphenatedlowercase
  zero-unit: 1
```

***

## Тесты

В данной версии остутствуют

***

## License

MIT License
