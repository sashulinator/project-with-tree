# ui/text-input

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/ui/text-input ui-text-input master
# Pull
git subtree pull --prefix=src/ui/text-input ui-text-input master
# Force
git push ui-text-input `git subtree split --prefix=src/ui/text-input @`:master --force
```

test

### diff

```
git --no-pager diff ui-text-input/master master:src/ui/text-input
```

### Add to your project

1. Add a repository alias `git remote add ui-text-input git@github.com:sashulinator/ui-text-input.git`
2. To check a list of aliases `git remote -v`, you must see `ui-text-input`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/ui/text-input ui-text-input master`
