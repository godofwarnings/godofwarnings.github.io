---
layout: post
title: "Tower of Hanoi: A Recursion Classic"
description: "Exploring the Tower of Hanoi problem using recursion and Python, along with insights into its time complexity and connection to puzzles."
categories: [Data-Structure-and-Algorithms, Puzzles]
tags: [Recursion, DSA]
redirect_from:
  - /2025/05/29/
---

> Originally written on **30 July 2024, 16:53**

* Table of Contents
{:toc .toc}

# Introduction

The Tower of Hanoi is a classic recursive puzzle where the goal is to move \\(n\\) discs from a source tower to a target tower, using a spare tower — all while never placing a larger disc on a smaller one.

The problem is a great illustration of how recursion breaks a large problem into smaller sub-problems.

# Step-by-step logic

Let’s consider the following Python code to solve the problem:

```python
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

## Some Sample Cases

* If `n` is 0, we do nothing (base case).
* if `n` is 1, we can directly move the disc from the source to the target.
* if `n` is 2, we can move the first disc to the spare tower, then the second disc to the target tower, and finally the first disc from the spare tower to the target tower.
* if `n` is 3, imagine that there are only two discs on the source tower and our spare tower is actually the target tower. We can follow the procedure for `n = 2` to move the first two discs to the spare tower (imagining it as the target tower), then move the third disc directly to the target tower. Now the source tower is the spare tower and we just need to move the two discs from the spare tower to the target tower, which is again a case of `n = 2`.
* if `n` is 4, we can follow the same logic as above, treating the first three discs as a subproblem and moving them to the spare tower, then moving the fourth disc to the target tower, and finally moving the three discs from the spare tower to the target tower.
* This pattern continues for any number of discs `n`.

## General Case

* At line 12, we make the initial call to move all `n` discs from tower **A** to tower **C**.
* First, we move the top `n-1` discs to the **spare** tower (line 8).
* Then, we move the largest disc to the **target** tower (line 9).
* Finally, we move the `n-1` discs from the **spare** tower to the **target** tower (line 10).

This recursive approach continues until `n = 0`, which becomes our base case.

# Time Complexity

The number of moves required to solve the Tower of Hanoi puzzle for `n` discs follows the recurrence:

$$ T(n) = 2 \cdot T(n-1) + 1 $$

This simplifies to:

$$ T(n) = 2^n - 1 $$

So for 10 discs, it takes \\(2^{10} - 1 = 1023\\) moves!

# References

* [3Blue1Brown - Tower of Hanoi and the Sierpinski Triangle](https://youtu.be/2SUvWfNJSsM?si=DPtOK-lMpcQjF45w)
