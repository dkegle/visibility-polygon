# Visibility polygon

##### Problem

Given polygon P and point z in it's interior, calculate the largest polygon that is contained in P which is visible from z.

##### Solution

Use sweep line approach. We sweep through points in P ordered by angle. Current state consists of lines which intersect ray from z at current angle, ordered by distance from z. Events are starting and ending points of lines. Closest lines in state define our solution.

Asymptotic time complexity is O(nlog n), since we are sorting events.

##### Running Webassembly demo
Live demo [here](https://dkegle.github.io/visibility-polygon/). To run it locally, follow these steps.
1) You need Emscripten SDK to compile C++ to Webassembly. Install it from Github.
```
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install latest
```
Then activate and source.
```
./emsdk activate latest
source ./emsdk_env.sh
```
2) Use the same terminal to clone visibility-polygon repo and build static files.
```
cd ..
git clone https://github.com/dkegle/visibility-polygon.git
cd visibility-polygon
npm install
npm run build-cpp
npm run build-js
```
The app should now run on http://localhost:8080/.


#### Misc

![](img/examples.png)



Handling special cases (several points lie at the same angle):

![](img/degenerate.png)
