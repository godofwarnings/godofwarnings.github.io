---
layout: post
title: "The Egg Dropping Puzzle: An Intuitive Solution to a Classic Problem"
description: "A deep dive into the classic 2-egg, 100-story building puzzle. We explore why common approaches fail and derive the elegant, optimal solution by reframing the question."
categories: [Puzzles, Mathematics, Optimization, Quant]
tags: [Brain-Teaser, Dynamic-Programming, Recursion, Strategy]
redirect_from:
  - /2025/09/08/
---

> Originally written on **8 September 2025, 18:22**

* Table of Contents
{:toc .toc}

## Introduction

The egg dropping puzzle is a famous brain teaser that challenges our assumptions about optimization. It's a fantastic problem because its elegant solution is both counter-intuitive and deeply satisfying once understood. It forces us to balance risk and information, a core concept in computer science and strategic planning.

### Problem Statement

You are in a 100-story building and are given two identical eggs. You want to determine the **threshold floor**, which is the lowest floor from which an egg will break when dropped. An egg that survives a fall can be reused, but a broken egg is lost.

The question is: What is the **minimum number of drops** you need to guarantee you can find the threshold floor in the worst-case scenario?

---

## Flawed Strategies: Building Intuition

Before jumping to the optimal solution, it's helpful to understand why more straightforward approaches don't work well.

### Strategy 1: The "One Egg" Method (Linear Scan)

If you only had one precious egg, your strategy is severely limited. You cannot risk breaking it on a high floor, as you would lose all ability to test the floors below. Your only choice is to start at floor 1 and work your way up, one by one.

* Drop from floor 1. If it breaks, the threshold is 1.
* If not, drop from floor 2. If it breaks, the threshold is 2.
* ...and so on.

In the worst-case scenario (the threshold floor is 99, 100, or the eggs don't break at all), you would need up to 99 or 100 drops. With two eggs, we can certainly do better.

### Strategy 2: The "Binary Search" Method

A binary search seems promising. Let's try dropping the first egg from the middle, floor 50.

* **Case A: The egg breaks.** You've used one drop. Now you have one egg left, and you know the threshold is somewhere between floor 1 and 49. With only one egg, you must revert to the linear scan method, checking floors 1, 2, 3... up to 49.
  * **Worst-Case:** 1 (from floor 50) + 49 (linear scan) = **50 drops**.
* **Case B: The egg survives.** You've used one drop. You still have two eggs and now must find the threshold between floors 51 and 100. You could repeat the process and drop from floor 75.

The issue is the asymmetry in the worst-case outcomes. A single break forces us into a slow, linear scan. While better than 100 drops, 50 is far from optimal. The problem is that our first drop doesn't balance the work required in the "break" vs. "survive" scenarios.

---

## The Optimal Strategy: Flipping the Question

The key insight, is to change the question. Instead of asking:

> "Given 100 floors, what is the minimum number of drops ($n$)?"

We ask the inverse:

> "Given a fixed number of drops ($n$), what is the **maximum number of floors** ($H$) I can test?"

This reframing makes the problem much more manageable. Let's say we allow ourselves a maximum of $n$ drops.

### An Example: 2 Eggs and 4 Drops

Let's work through a concrete example. Suppose you have **2 eggs** and are allowed a maximum of **4 drops**. What is the tallest building you can solve the puzzle for?

Let's say your first drop is from floor $x$.

* **Case 1: The egg breaks.**
  * You have used **1 drop** and are left with **1 egg** and **3 drops**.
  * With only one egg, you must check the floors below $x$ one by one.
  * Since you have 3 drops left, you can check a maximum of **3 floors** this way.
  * To maximize the total height, you should plan for this worst case. So, the number of floors below your first drop ($x-1$) must be 3.
  * This means your first drop **must be from floor $x = 4$**.

* **Case 2: The egg survives.**
  * You dropped from floor 4 and the egg is fine. You have used **1 drop** and are left with **2 eggs** and **3 drops**.
  * Now, you need to figure out how many floors *above* floor 4 you can test with your remaining 2 eggs and 3 drops. This is a smaller version of the same problem.
  * Let's find the max height you can test with 2 eggs and 3 drops. Let's call it $H(3)$. Using the same logic, your next drop should be from 3 floors above your current position (floor 4), so from floor $4+3=7$. If it breaks, you use your last 2 drops to check floors 5 and 6. If it survives, you continue up. The total height you can check with 3 drops turns out to be 6 floors.

**Putting it all together for 4 drops:**
Your first drop is from floor 4.

* If it breaks, you check floors 1, 2, and 3. Total drops used: 1 (floor 4) + up to 3 (linear scan) = 4 drops max.
* If it survives, you move up. You know floors 1-4 are safe. You can then test an additional **6 floors** above with your remaining 3 drops.

So, the maximum total number of floors you can test is:
$$ \text{Total Floors} = \underbrace{(4 - 1)}_{\text{Floors below}} + \underbrace{1}_{\text{Floor of drop}} + \underbrace{6}_{\text{Floors above}} = 10 \text{ floors} $$
With 4 drops, we can guarantee finding the threshold in a 10-story building.

### The Logic of the First Drop

Now, let's generalize. Suppose we allow ourselves a maximum of $n$ drops.

Your first drop is from floor $x$. Two things can happen:

1. **The egg breaks.** You have used **1 drop** and have lost an egg. You are now left with **1 egg** and **$n-1$ drops**. With only one egg, you must use the remaining $n-1$ drops to check the floors *below* $x$ (i.e., floors 1 to $x-1$) one by one. To guarantee success in the worst case, the number of floors you have to check, $x-1$, must be no more than the drops you have left, $n-1$. Therefore:
    $$ x - 1 \le n - 1 \implies x \le n $$
    To maximize the total height, we should choose the highest possible floor for our first drop, so we choose **$x = n$**.

2. **The egg survives.** You have used **1 drop** but still have **2 eggs**. You have **$n-1$ drops** remaining. You can now move up from floor $x$ and solve the problem for a taller building with your remaining $n-1$ drops.

Combining these, the maximum number of floors we can test with $n$ drops, let's call it $H(n)$, is:

* The $n-1$ floors below our first drop (checked linearly if it breaks).
* The 1 floor *at* our first drop.
* The $H(n-1)$ floors *above* our first drop (which we can test with our remaining $n-1$ drops).

This gives us a beautiful recurrence relation:
$$ H(n) = (n-1) + 1 + H(n-1) = n + H(n-1) $$

### Solving the Puzzle

Let's unroll this recurrence.

* $H(1) = 1$ (With one drop, you can only test floor 1).
* $H(2) = 2 + H(1) = 2 + 1 = 3$.
* $H(3) = 3 + H(2) = 3 + 2 + 1 = 6$.
* $H(n) = n + (n-1) + (n-2) + \dots + 1$.

This is simply the sum of the first $n$ integers, which corresponds to the **n-th triangular number**.
$$ H(n) = \frac{n(n+1)}{2} $$

Now we can return to the original problem. We need to find the smallest integer $n$ such that the maximum height we can test, $H(n)$, is at least 100 floors.
$$ \frac{n(n+1)}{2} \ge 100 $$
$$ n(n+1) \ge 200 $$

We can see by inspection that $13 \times 14 = 182$ (too small) and $14 \times 15 = 210$ (just right).

* With 13 drops, we can only guarantee testing up to $\frac{13 \times 14}{2} = 91$ floors.
* With 14 drops, we can guarantee testing up to $\frac{14 \times 15}{2} = 105$ floors, which is more than enough for our 100-story building.

Therefore, the minimum number of drops required in the worst case is **14**.

---

## The General Solution: Mathematical Proof

The intuitive method works perfectly for 2 eggs. Lets discuss a method that works for any number of eggs ($k$) and any number of drops [$n$].

Let's define $H(k, n)$ as the maximum height (number of floors) we can test with $k$ eggs and $n$ drops.

Consider our first drop from some floor $a$.

1. **If the egg breaks:** We have used 1 drop and lost 1 egg. We are left with $k-1$ eggs and $n-1$ drops. We must now test the $a-1$ floors below. The maximum number of floors we can handle in this situation is $H(k-1, n-1)$. So, $a-1 = H(k-1, n-1)$.
2. **If the egg survives:** We have used 1 drop but still have $k$ eggs. We are left with $k$ eggs and $n-1$ drops. We can now test the floors above floor $a$. The maximum number of additional floors we can test is $H(k, n-1)$.

The total height is the sum of the floors below, the current floor, and the floors above:
$$ H(k, n) = (\text{floors below}) + 1 + (\text{floors above}) $$
$$ H(k, n) = H(k-1, n-1) + 1 + H(k, n-1) $$

This recurrence relation allows us to build a table for any combination of eggs and drops, just as demonstrated in the video.

**Base Cases:**

* With 1 egg, you must scan linearly: $H(1, n) = n$
* With 1 drop, you can only check floor 1: $H(k, 1) = 1$

Using this, we can verify our previous result for $k=2$ eggs.

* $H(2, 1) = 1$.
* $H(2, 2) = H(1, 1) + 1 + H(2, 1) = 1 + 1 + 1 = 3$.
* $H(2, 3) = H(1, 2) + 1 + H(2, 2) = 2 + 1 + 3 = 6$.
* $H(2, 4) = H(1, 3) + 1 + H(2, 3) = 3 + 1 + 6 = 10$.

This perfectly generates the triangular numbers we found earlier: 1, 3, 6, 10, ...

---

## References

* [James Tanton - Egg Dropping: Going beyond just solving the classic puzzle](https://www.youtube.com/watch?v=c3s-a7e_iUE)
