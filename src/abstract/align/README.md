# a-Align

## Description

A component for positioning an element relative to another element.

## Features

### Subscribe to DOM

The `a-Align` component uses the `alignElement` function from the `dom-align-ts` library. This function positions one element relative to another element once, i.e., it does not reposition when the DOM changes.
The `a-Align` subscribes to:

- Scrolling of the parent elements `sourceElement` and `targetElement`.
- Changes in the sizes of `sourceElement` and `targetElement`.
- Changes in the browser window size.

### Port `sourceElement` to `containerElement`

Port `sourceElement` to `containerElement` by `React.createPortal`.

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/align a-align master
# Pull
git subtree pull --prefix=src/abstract/align a-align master
# Force
git push a-align `git subtree split --prefix=src/abstract/align @`:master --force
```

### `diff`

```
git --no-pager diff a-align/master master:src/abstract/align
```

### Add to your project

1. Add a repository alias `git remote add a-align git@github.com:sashulinator/a-align.git`
2. To check a list of aliases `git remote -v`, you must see `a-align`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/align a-align master`
