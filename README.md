# Best Template

## Папки в src

### app

1. Содержит верхнеуровневую логику (index.html, layout, providers)
2. Ничего не экспортирует

### lib

1. Выполняет функцию папки 'helpers' т.е. файлы этой папки могут импортировать что угодно
2. Не может содержать в файлы, **только** папки
3. Содержить index файл с импортами **только** на втором уровне
4. Папки классифицируются по:
   a. логике (auth, api, error)
   b. типу данных (dropdownOptions)
   c. библиотекам (i18n, toast)

### pages

1. Страницы

### shared

1. Содержит конфиги (routes)
2. Содержит инстансы (axios, dayjs, i18n, react-query)

### utils

1. Ничего не знает о проекте, т.е. не импортирует в себя ничего кроме файлов папки utils
2. Содержить index файл с импортами **только** на втором уровне
3. Папки классифицируются по:
   a. логике (dom, error)
   b. типу данных (string, number, list)

### widgets

1. Содержит в себе части и логику компонента, которые требуется собирать по месту применения (tree + node + expandable + selectable)

## Папки НЕ в src

### types

1. Каждый тип имеет отдельный файл
2. Не содержит index file

### \_private

1. Может содержаться в себе файлы любого типа, несущие в себе незначительную логику узкой направленности, т.е. есть уверенность что эта логика будет перменена лишь раз и в ее дальнейшей поддержке нет неоходимости (notFoundComponent)
2. Помогает сосредоточиться на важном

## Публикация на GH-Pages
### 1. Переименовать index.html в 404.html
### 2. Добавить скрипт 
```html
<script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafrex/spa-github-pages
      // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
      // ----------------------------------------------------------------------
      // This script checks to see if a redirect is present in the query string
      // and converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      (function(l) {
        if (l.search) {
          var q = {};
          l.search.slice(1).split('&').forEach(function(v) {
            var a = v.split('=');
            q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
          });
          if (q.p !== undefined) {
            window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + (q.p || '') +
              (q.q ? ('?' + q.q) : '') +
              l.hash
            );
          }
        }
      }(window.location))
    </script>
```
### 3. Заменить урлы с `/assets` на `/project-with-tree/assets`
### 4. Скопировать папку `mocks` в `dist`
### 5. Запустить `yarn gh-pages -d dist`

