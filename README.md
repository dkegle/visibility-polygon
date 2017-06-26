# visibility-polygon
This repository contains a C++ implementation of sweep line algorithm for the following problem.

##### Problem

Given a polygon P and a point z in it's interior (called a viewpoint), calculate the largest polygon that is contained in P which is visible from viewpoint z.

##### Solution

We use sweep line approach. We sweep through points in P ordered by angle. Current state consists of lines which intersect ray at current angle, ordered by their distance from viewpoint z. Events are starting and ending points of lines. Closest lines in state define our solution.

Asymptotic time complexity is O(nlog n), since we are sorting events.

Some results are shown in the image below.

![](img/examples.png)



The algorithm also correctly handles special cases where several points lie at the same angle:

![](img/degenerate.png)