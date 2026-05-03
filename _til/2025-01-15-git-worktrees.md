---
layout: til
title: "git worktree lets you check out multiple branches simultaneously"
date: 2025-01-15
tags: [git, workflow]
---

You can have multiple working trees from the same repo without cloning.

```bash
git worktree add ../feature-branch feature-branch
```

Now `../feature-branch` has that branch checked out while your main
directory stays on `main`. Useful for reviewing PRs without stashing.