# a-Tooltip

## Description

A Tooltip component, which displays a content over a target element if the cursor is over the target element

## Features

Uses the [`a-Popover`](https://github.com/sashulinator/a-popover) component and inherits some its props.

### Close/open

- Display the `Tooltip` if the cursor is over the target element.
- Display the `Tooltip` if the cursor left the target element.

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/tooltip a-tooltip master
# Pull
git subtree pull --prefix=src/abstract/tooltip a-tooltip master
# Force
git push a-tooltip `git subtree split --prefix=src/abstract/tooltip @`:master --force
```

### `diff`

```
git --no-pager diff a-tooltip/master master:src/abstract/tooltip
```

### Add to your project

1. Add a repository alias `git remote add a-tooltip git@github.com:sashulinator/a-tooltip.git`
2. To check a list of aliases `git remote -v`, you must see `a-tooltip`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/tooltip a-tooltip master`
