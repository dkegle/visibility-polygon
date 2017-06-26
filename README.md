# visibility-polygon
Line sweep algorithm

This algorithm solves the following problem: given a polygon P and a point z in it's interior, calculate polygon in P that is visible from z.

It uses line sweep by angle. State consists of lines which intersect ray at current angle, ordered by distance from point z. Events are starting and ending points of lines.
