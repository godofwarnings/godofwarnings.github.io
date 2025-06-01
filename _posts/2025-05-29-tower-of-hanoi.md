---
layout: post
title: "Tower of Hanoi: A Recursion Classic"
description: "Exploring the Tower of Hanoi problem using recursion and Python, along with insights into its time complexity and connection to puzzles."
categories: [dsa, recursion]
tags: [recursion, python, puzzles, bit manipulation, code snippet]
redirect_from:
  - /2024/07/30/
---

> Originally written on **30 July 2024, 16:53**

* Table of Contents
{:toc .toc}

# Introduction

The Tower of Hanoi is a classic recursive puzzle where the goal is to move \\(n\\) discs from a source tower to a target tower, using a spare tower — all while never placing a larger disc on a smaller one.

The problem is a great illustration of how recursion breaks a large problem into smaller subproblems.

# Recursive Approach

Let’s consider the following Python code to solve the problem:

```python
# Tower of Hanoi in Python
n = 10  
A = [i for i in range(1,n+1)]  # source
B = []  # spare
C = []  # target

def hanoi(n, source, target, spare):
    if n > 0:
        hanoi(n-1, source, spare, target)
        print(f"Move disc {n} from {source} to {target}.")
        hanoi(n-1, spare, target, source)

hanoi(n, 'A', 'C', 'B')
```

### Step-by-step logic:
- At line 12, we make the initial call to move all `n` discs from tower **A** to tower **C**.
- First, we move the top `n-1` discs to the **spare** tower (line 8).
- Then, we move the largest disc to the **target** tower (line 9).
- Finally, we move the `n-1` discs from the **spare** tower to the **target** tower (line 10).

This recursive approach continues until `n = 0`, which becomes our base case.

# Time Complexity

The number of moves required to solve the Tower of Hanoi puzzle for `n` discs follows the recurrence:

$$ T(n) = 2 \cdot T(n-1) + 1 $$

This simplifies to:

$$ T(n) = 2^n - 1 $$

So for 10 discs, it takes \\(2^{10} - 1 = 1023\\) moves!

# References

- [3Blue1Brown - Tower of Hanoi and the Sierpinski Triangle](https://youtu.be/2SUvWfNJSsM?si=DPtOK-lMpcQjF45w)
- [Recursive formula derivation (WIP)]()
