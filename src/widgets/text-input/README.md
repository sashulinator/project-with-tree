# widgets/text-input

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/widgets/text-input widgets-text-input master
# Pull
git subtree pull --prefix=src/widgets/text-input widgets-text-input master
# Force
git push widgets-text-input `git subtree split --prefix=src/widgets/text-input @`:master --force
```

test

### diff

```
git --no-pager diff widgets-text-input/master master:src/widgets/text-input
```

### Add to your project

1. Add a repository alias `git remote add widgets-text-input git@github.com:sashulinator/widgets-text-input.git`
2. To check a list of aliases `git remote -v`, you must see `widgets-text-input`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/widgets/text-input widgets-text-input master`
