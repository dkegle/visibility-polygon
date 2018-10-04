#include "emscripten.h"

#include <stdlib.h>
#include <iostream>

#include "geometry.h"
#include "vis_poly.h"

extern "C" {

// data
Polygon g_Polygon;
std::vector<double> g_Result;

// api
EMSCRIPTEN_KEEPALIVE
void setPolygon(double* plg, int n){
  g_Polygon.clear();
  for(int i=1; i<n; i+=2){
    g_Polygon.push_back(Point(plg[i-1], plg[i]));
  }
  if(g_Polygon.size() > 0 && (g_Polygon.front().x != g_Polygon.back().x ||
    g_Polygon.front().y != g_Polygon.back().y))
  {
      g_Polygon.push_back(g_Polygon.front());
  }

}

EMSCRIPTEN_KEEPALIVE
double* getVisPoly(){
  return g_Result.data();
}

EMSCRIPTEN_KEEPALIVE
int getVisPolySize(){
  return g_Result.size();
}

// returns 1 if point (x,y) is inside g_polygon, or 0 otherwise
EMSCRIPTEN_KEEPALIVE
int isInsidePolygon(double x, double y){
  Point p(x,y);
  Ray r(p, Point(x+1.0, y));

  Point intr;
  int num_intrs = 0;
  for(int i=1; i<g_Polygon.size(); ++i){
    LineSegment cur_seg(g_Polygon[i-1], g_Polygon[i]);

    double d=distance(cur_seg, p);
    if(d < GEOM_PRECISION)
      return 0; // too close to the boundary

    if(intersection(cur_seg, r, intr))
      ++num_intrs;
  }
  return num_intrs%2;
}

// calculates visibility polygon from (x,y) inside current g_Polygon
EMSCRIPTEN_KEEPALIVE
void runVisPoly(double x, double y){
  Point viewpoint(x,y);
  g_Result.clear();
  g_Result = VisPoly().run(g_Polygon, viewpoint);
}

} // extern C
