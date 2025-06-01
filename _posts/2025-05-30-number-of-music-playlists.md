---
layout: post
title: "920. Number of Music Playlists"
description: "A detailed breakdown of the dynamic programming approach for the Leetcode problem 920. Number of Music Playlists, including recurrence, base cases, and C++ implementation."
categories: [dsa, dynamic programming]
tags: [CPP, DSA, LEETCODE, DYNAMIC PROGRAMMING]
redirect_from:
  - /2025/05/30/
---

> Originally written on **03 August 2024, 13:36**

* Table of Contents
{:toc .toc}

# Intuition

The subproblem is the following: `dp[i][j]` denotes the number of playlists we can make using `i` out of `n` `unique_songs` and a playlist length of `j` out of `total_songs`.

We can have the following two cases:

1. **We add another song using an already existing song:**

   $$
   dp[i][j] = dp[i][j-1] \cdot \text{(number of ways to choose a song out of those i songs)}
   $$

   Note that we cannot choose any of the last `k` songs since we need at least that many songs between repetitions. So, out of the `i` songs, we cannot choose the last `k` songs.

    <p align="center"><img src="/assets/images/posts/number-of-music-playlists/img-1.png" style="max-width: 50%; height: auto;" alt="Description"></p>


   Hence we'll have:

   $$
   dp[i][j] = dp[i][j-1] \cdot \max(0, i - k)
   $$

   All these `k` songs will be different, as in a valid playlist, if a song repeats, it must have at least `k` songs between repeats. If `i-k` becomes negative, we take `0` instead.

2. **We add another song using a new song:**

   $$
   dp[i][j] += dp[i-1][j-1] \cdot (\text{n_unique_songs} - (i-1))
   $$

   We have remaining `n_unique_songs - (i - 1)` choices.

Thus, the complete recurrence relation becomes:

$$
dp[i][j] = dp[i][j-1] \cdot \max(0, i - k) + dp[i-1][j-1] \cdot (\text{n_unique_songs} - (i - 1))
$$

# Base Case

1. **Why `dp[0][0] = 1`?**  
   It's possible to fill an empty list with 0 songs.  
   All `j > i` are invalid cases (you can't put more songs into an empty list), so for `j > 0`, `dp[0][j] = 0`.  
   Similarly, for `i > 0`, `dp[i][0] = 0`.

2. **Example:**  
   Take `dp[1][1]`. To fit a size-1 list with 1 new song, we have:

   $$
   dp[0][1 - 1] \cdot (N - (1 - 1)) = 1 \cdot N
   $$

# Code

```cpp
const long long int modulo = 1e9 + 7;
int numMusicPlaylists(int unique_songs, int total_songs, int k) {
    vector<vector<long long int>> dp(unique_songs + 1, vector<long long int>(total_songs + 1, 0));
    dp[0][0] = 1;
    for (int i = 1; i <= unique_songs; ++i) {
        for (int j = 1; j <= total_songs; ++j) {
            dp[i][j] = (dp[i][j - 1] * max(0, i - k)) % modulo;
            dp[i][j] = (dp[i][j] + dp[i - 1][j - 1] * (unique_songs - i + 1)) % modulo;
        }
    }
    return dp[unique_songs][total_songs];
}
```