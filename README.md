# visibility-polygon
##### Problem

We solve the following problem: given a polygon P and a point z in it's interior (called a viewpoint), calculate the largest polygon that is contained in P which is visible from viewpoint z.

##### Solution

This implementation uses sweep line approach. It sweeps through points in P ordered by angle. State consists of lines which intersect ray at current angle, ordered by their distance from viewpoint z. Events are starting and ending points of lines. Top lines in state define our solution.

Asymptotic complexity is O(nlog n), since we are sorting events.

Some results are shown in the image below.

![](img/examples.png)