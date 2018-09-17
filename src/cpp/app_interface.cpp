#include "emscripten.h"

#include <stdlib.h>
#include <iostream>

#include "geometry.h"


extern "C" {

double g_viewpoint[2] = {0.0, 0.0};
double* g_polygon = nullptr;
int g_polygon_size = 0;
double* g_vis_poly = nullptr;
int g_vispoly_size = 0;

EMSCRIPTEN_KEEPALIVE
void setViewpoint(double x, double y){
  g_viewpoint[0]=x;
  g_viewpoint[1]=y;
}

EMSCRIPTEN_KEEPALIVE
void setPolygon(double* plg, int n){
  g_polygon_size=n;
  for(int i=0; i<n; ++i)
    g_polygon[i]=plg[i];
}

EMSCRIPTEN_KEEPALIVE
double* getVisPoly(){
  return g_vis_poly;
}

EMSCRIPTEN_KEEPALIVE
int getVisPolySize(){
  return g_vispoly_size;
}

EMSCRIPTEN_KEEPALIVE
void freeVisPoly(){
  free(g_vis_poly);
}

// returns 1 if point (x,y) is inside g_polygon, or 0 otherwise
EMSCRIPTEN_KEEPALIVE
int isInsidePolygon(double x, double y){
  Point p(x,y);
  Ray r(p, Point(x+1.0, y));

  Point intr;
  int num_intrs = 0;
  for(int i=2; i<g_polygon_size; i+=2){
    Point p1(g_polygon[i-2], g_polygon[i-1]);
    Point p2(g_polygon[i], g_polygon[i+1]);
    LineSegment cur_seg(p1, p2);

    double d=distance(cur_seg, p);
    if(d < GEOM_PRECISION)
      return 0; // too close to the boundary

    if(intersection(cur_seg, r, intr))
      ++num_intrs;
  }
  return num_intrs%2;
}

} // extern C
