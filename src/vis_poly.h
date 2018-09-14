#pragma once

#include <memory>

#include "geometry.h"

class VisPoly {
public:

   VisPoly() {}

   Polygon run(const Polygon& plg, const Point& view_point);

private:
   struct Edge;

   struct Event {
      Event(const Point* _p_orig, const std::shared_ptr<Edge>& e1,
         const std::shared_ptr<Edge>& e2, double _angle) :
         p_orig(_p_orig), edge_1(e1), edge_2(e2), angle(_angle) {}
      const Point* p_orig;
      std::shared_ptr<Edge> edge_1;
      std::shared_ptr<Edge> edge_2;
      double angle; // with e1 (from viewpoint)
   };

   struct Edge {
      Edge(const Point* f, const Point* t, double _from_angle, double _to_angle) :
         from(f), to(t), p1_angle(_from_angle), p2_angle(_to_angle) {}
      const Point* from;
      const Point* to;
      double p1_angle;
      double p2_angle;
      Edge* next;
   };

   struct EventComparator {
      Point viewpoint;
      EventComparator(const Point& vp) : viewpoint(vp) {}
      bool operator()(std::shared_ptr<Event>& a, std::shared_ptr<Event>& b) const;
   };

   struct EdgeComparator {
      Point viewpoint;
      EdgeComparator(const Point& vp) : viewpoint(vp) {}
      bool operator()(const Edge* p1, const Edge* p2) const;
   };
};
