# a-Popover

## Description

A component component, which displays a content over a target element.

## Features

Extends the [`a-Align`](https://github.com/sashulinator/a-align) component fetures. The [`a-Align`](https://github.com/sashulinator/a-align) component allows positioning an element relative to another element.

### Close/open

Allows opening and closing of the `a-Popover` by prop `opened`.
Props `onClose`, `onClickOutside` and `onEscKeyDown` allows listening to the corresponding events. of the `a-Popover`.

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/popover a-popover master
# Pull
git subtree pull --prefix=src/abstract/popover a-popover master
# Force
git push a-popover `git subtree split --prefix=src/abstract/popover @`:master --force
```

### `diff`

```
git --no-pager diff a-popover/master master:src/abstract/popover
```

### Add to your project

1. Add a repository alias `git remote add a-popover git@github.com:sashulinator/a-popover.git`
2. To check a list of aliases `git remote -v`, you must see `a-popover`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/popover a-popover master`
