# a-Callout

## Description

A component for positioning an element relative to another element.

## Features

### Subscribe to DOM

The Callout component allows positioning a content relative to a target and subscribes content to a `placement` prop. Extends the [`a-Popover`](https://github.com/sashulinator/a-popover) component fetures.

Use can use this [Callout](https://developer.microsoft.com/en-us/fluentui#/controls/web/callout) as a reference.

### Subscribes content to a `placement` prop

Use [`a-Popover`](https://github.com/sashulinator/a-popover) If you don't need to listen to a `placement` prop.

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/callout a-callout master
# Pull
git subtree pull --prefix=src/abstract/callout a-callout master
# Force
git push a-callout `git subtree split --prefix=src/abstract/callout @`:master --force
```

### `diff`

```
git --no-pager diff a-callout/master master:src/abstract/callout
```

### Add to your project

1. Add a repository alias `git remote add a-callout git@github.com:sashulinator/a-callout.git`
2. To check a list of aliases `git remote -v`, you must see `a-callout`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/callout a-callout master`
