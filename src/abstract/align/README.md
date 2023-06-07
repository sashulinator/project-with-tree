# abstract/align

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/abstract/align abstract-align master
# Pull
git subtree pull --prefix=src/abstract/align abstract-align master
# Force
git push abstract-align `git subtree split --prefix=src/abstract/align @`:master --force
```

test

### diff

```
git --no-pager diff abstract-align/master master:src/abstract/align
```

### Add to your project

1. Add a repository alias `git remote add abstract-align git@github.com:sashulinator/abstract-align.git`
2. To check a list of aliases `git remote -v`, you must see `abstract-align`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/align abstract-align master`

## dependencies

### installation

```bash
yarn add dom-align-ts
git remote add utils-hooks git@github.com:sashulinator/utils-hooks.git
git subtree add --prefix=src/utils/hooks utils-hooks master
git remote add utils-dom git@github.com:sashulinator/utils-dom.git
git subtree add --prefix=src/utils/dom utils-dom master
git remote add utils-react git@github.com:sashulinator/utils-react.git
git subtree add --prefix=src/utils/react utils-react master
```
