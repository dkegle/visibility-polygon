#include "emscripten.h"

#include <stdlib.h>
#include <iostream>

#include "geometry.h"
#include "vis_poly.h"

extern "C" {

// data
Polygon g_plg;
double* g_vis_poly = nullptr;
int g_vis_poly_size = 0;

// api
EMSCRIPTEN_KEEPALIVE
void setPolygon(double* plg, int n){
  g_plg.clear();
  for(int i=1; i<n; i+=2){
    g_plg.push_back(Point(plg[i-1], plg[i]));
  }
  if(g_plg.size() > 0 && (g_plg.front().x != g_plg.back().x || g_plg.front().y != g_plg.back().y))
    g_plg.push_back(g_plg.front());
}

EMSCRIPTEN_KEEPALIVE
double* getVisPoly(){
  return g_vis_poly;
}

EMSCRIPTEN_KEEPALIVE
int getVisPolySize(){
  return g_vis_poly_size;
}

EMSCRIPTEN_KEEPALIVE
void freeVisPoly(){
  free(g_vis_poly);
  g_vis_poly_size=0;
}

// returns 1 if point (x,y) is inside g_polygon, or 0 otherwise
EMSCRIPTEN_KEEPALIVE
int isInsidePolygon(double x, double y){
  Point p(x,y);
  Ray r(p, Point(x+1.0, y));

  Point intr;
  int num_intrs = 0;
  for(int i=1; i<g_plg.size(); ++i){
    LineSegment cur_seg(g_plg[i-1], g_plg[i]);

    double d=distance(cur_seg, p);
    if(d < GEOM_PRECISION)
      return 0; // too close to the boundary

    if(intersection(cur_seg, r, intr))
      ++num_intrs;
  }
  return num_intrs%2;
}

// calculates visibility polygon from (x,y) inside current g_plg
EMSCRIPTEN_KEEPALIVE
void runVisPoly(double x, double y){
  freeVisPoly();
  Point vp(x,y); // viewpoint
  VisPoly c_vp;
  Polygon result = c_vp.run(g_plg, vp);
  g_vis_poly_size = 2*result.size();
  g_vis_poly = (double*)malloc(g_vis_poly_size*sizeof(double));
  for(int i=0; i<result.size(); ++i){
    g_vis_poly[2*i]=result[i].x;
    g_vis_poly[2*i+1]=result[i].y;
  }
}

} // extern C
