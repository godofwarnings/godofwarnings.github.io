---
layout: post
title: "Graph Traversal - BFS and DFS"
description: "Analyzing time complexity of Breadth-First Search (BFS) and Depth-First Search (DFS) using adjacency list and vertex-edge analysis."
categories: [Data-Structure-and-Algorithms]
tags: [CPP, DSA, Graphs]
redirect_from:
  - /2025/05/30/
---

> Originally written on **01 August 2024, 21:00**

* Table of Contents
{:toc .toc}

# Why is time complexity of BFS & DFS \\(\mathcal{O}(|V| + |E|)\\)

It seems that since we are only visiting all the edges, the time complexity should be $\mathcal{O}(\lvert E \rvert)$. But the thing is, we are ignoring the constant operations that are being performed $\lvert V \rvert$ number of times.

```python
# This while loop will run V times, where V is total number of vertices in graph.
while(graphTraversal.isEmpty == false)

    currentVertex = graphTraversal.getVertex();

    # This while loop will run E_adj times, where E_adj is number of adjacent edges to current vertex.
    while(currentVertex.hasAdjacentVertices)
        graphTraversal.add(adjacentVertex);

    graphTraversal.remove(currentVertex);
```

$$ \therefore $$ the time complexity will be:


$$
\begin{align*}
\mathcal{O}(V * (\mathcal{O}(1) + O(E_{adj}) + \mathcal{O}(1))) &= \mathcal{O}(V + V * E_{adj} + V)\\
&= \mathcal{O}(2V + E(\textit{total number of edges in graph})) \\
&= \mathcal{O}(V + E) \\
\end{align*}
$$



# References

- [Stack Overflow - BFS Time Complexity](https://stackoverflow.com/questions/26549140/breadth-first-search-time-complexity-analysis)
