# a-Align

## description

A component for positioning an element relative to another element.

## Features

1. The `a-Align` component uses the `alignElement` function from the `dom-align-ts` library. This function positions one element relative to another element once, i.e., it does not reposition when the DOM changes.
   The `a-Align` subscribes to:

1. Scrolling of the parent elements `sourceElement` and `targetElement`.
1. Changes in the sizes of `sourceElement` and `targetElement`.
1. Changes in the browser window size.

1. It ports `sourceElement` to `containerElement`.

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/abstract/align a-align master
# Pull
git subtree pull --prefix=src/abstract/align a-align master
# Force
git push a-align `git subtree split --prefix=src/abstract/align @`:master --force
```

test

### diff

```
git --no-pager diff a-align/master master:src/abstract/align
```

### Add to your project

1. Add a repository alias `git remote add a-align git@github.com:sashulinator/a-align.git`
2. To check a list of aliases `git remote -v`, you must see `a-align`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/align a-align master`

## dependencies

### installation

```bash
yarn add dom-align-ts
git remote add utils-hooks git@github.com:sashulinator/utils-core.git
git subtree add --prefix=src/utils/core utils-core master
git remote add utils-hooks git@github.com:sashulinator/utils-hooks.git
git subtree add --prefix=src/utils/hooks utils-hooks master
git remote add utils-dom git@github.com:sashulinator/utils-dom.git
git subtree add --prefix=src/utils/dom utils-dom master
git remote add utils-react git@github.com:sashulinator/utils-react.git
git subtree add --prefix=src/utils/react utils-react master
```
