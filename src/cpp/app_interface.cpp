#include "emscripten.h"

#include <stdlib.h>
#include <iostream>

#include "geometry.h"
#include "vis_poly.h"

extern "C" {

Polygon g_plg;
double* g_polygon = nullptr;
int g_polygon_size = 0;
double* g_vis_poly = nullptr;
int g_vis_poly_size = 0;

EMSCRIPTEN_KEEPALIVE
void setPolygon(double* plg, int n){
  g_polygon_size=n;
  for(int i=0; i<n; ++i){
    g_polygon[i]=plg[i];
    if(i%2==1)
      g_plg.push_back(Point(g_polygon[i-1], g_polygon[i]));
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

EMSCRIPTEN_KEEPALIVE
void runVisPoly(double x, double y){
  Point vp(x,y); // viewpoint
  VisPoly c_vp;
  Polygon result = c_vp.run(g_plg, vp);
  freeVisPoly();
  g_vis_poly_size = 2*result.size();
  g_vis_poly = (double*)malloc(g_vis_poly_size*sizeof(double));
  for(int i=0; i<result.size(); ++i){
    g_vis_poly[2*i]=result[i].x;
    g_vis_poly[2*i+1]=result[i].y;
  }
}

} // extern C
