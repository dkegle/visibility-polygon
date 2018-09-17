
#include <vector>
#include <memory>
#include <set>
#include <algorithm>
#include <iostream>

#include <cmath> // abs

#include "vis_poly.h"

// assuming view_point is in interior of plg,
// and plg[0] == plg[plg.size() - 1]
Polygon VisPoly::run(const Polygon& plg, const Point& view_point) {
   if (plg.size() < 3)
      return Polygon();

   std::vector<std::shared_ptr<Event>> events;
   events.reserve(plg.size());

   EdgeComparator ec(view_point);
   std::set<Edge*, EdgeComparator> state(ec);

   std::cout << "Generating events and initial state .." << std::endl;
   Ray initial_ray(view_point, Point(view_point.x + 1.0, view_point.y));

   // initialization and sorting
   double p1_angle = getAngle(Point(1.0, 0.0), plg[plg.size() - 2] - view_point);
   double p2_angle = getAngle(Point(1.0, 0.0), plg[0] - view_point);

   if (p1_angle < GEOM_PRECISION)   // put angle 0 among last events
      p1_angle = 2.0 * pi;
   if (p2_angle < GEOM_PRECISION)
      p2_angle = 2.0 * pi;

   std::shared_ptr<Edge> first_edge = std::make_shared<Edge>(
      &plg[plg.size() - 2], &plg[0], p1_angle, p2_angle);

   if (first_edge->p1_angle > first_edge->p2_angle)
      std::swap(first_edge->from, first_edge->to);

   std::shared_ptr<Edge> prev_edge = first_edge;
   // check if edge intersects starting ray and add it in initial state
   auto addEdgeToInitialState = [&state, &view_point, &initial_ray] (std::shared_ptr<Edge>& _edge) {
      Point intr;
      if (intersection(LineSegment(*_edge->from, *_edge->to), initial_ray, intr)) {
         if (areCollinear(view_point, *_edge->from, *_edge->to)) {
            // skip
         }
         else {
            if (EuclideanDistance(intr, *_edge->from) < GEOM_PRECISION) {
               if (leftTurn(view_point, *_edge->from, *_edge->to)) {
                  state.insert(_edge.get());
                  std::swap(_edge->from, _edge->to);   // starting edges have angles reversed
                  std::swap(_edge->p1_angle, _edge->p2_angle);
               }
            }
            else if (EuclideanDistance(intr, *_edge->to) < GEOM_PRECISION) {
               if (leftTurn(view_point, *_edge->to, *_edge->from)) {
                  state.insert(_edge.get());
                  std::swap(_edge->from, _edge->to);
                  std::swap(_edge->p1_angle, _edge->p2_angle);
               }
            }
            else {
               std::swap(_edge->from, _edge->to);
               std::swap(_edge->p1_angle, _edge->p2_angle);
               state.insert(_edge.get());
            }
         }
      }
   };

   // make events and initial state
   for (unsigned i = 0; i < plg.size() - 2; ++i) {  // loop through input vertices
      p1_angle = getAngle(Point(1.0, 0.0), plg[i] - view_point);
      p2_angle = getAngle(Point(1.0, 0.0), plg[i + 1] - view_point);
      if (p1_angle < GEOM_PRECISION)
         p1_angle = 2.0 * pi;
      if (p2_angle < GEOM_PRECISION)
         p2_angle = 2.0 * pi;

      std::shared_ptr<Edge> edge = std::make_shared<Edge>(&plg[i], &plg[i + 1], p1_angle, p2_angle);
      if (edge->p1_angle > edge->p2_angle) {
         std::swap(edge->from, edge->to); // make sure edges point ccw
         std::swap(prev_edge->p1_angle, prev_edge->p2_angle);
      }

      std::shared_ptr<Event> new_event = std::make_shared<Event>
         (&plg[i], prev_edge, edge, p1_angle);

      events.push_back(new_event); // save new event

      addEdgeToInitialState(prev_edge);

      prev_edge->next = edge.get();
      prev_edge = edge;
   }
   prev_edge->next = first_edge.get();

   // add last event, which has prev_edge and first_edge as incident edges
   double angle = getAngle(Point(1.0, 0.0), plg[plg.size() - 2] - view_point);
   if (angle < GEOM_PRECISION)
      angle = 2.0*pi;
   std::shared_ptr<Event> last_event = std::make_shared<Event>(&plg[plg.size() - 2],
      first_edge, prev_edge, angle);

   events.push_back(last_event);

   addEdgeToInitialState(prev_edge); // check if last edge intersects starting ray

   EventComparator ev(view_point);
   std::sort(events.begin(), events.end(), ev);

   if (state.empty()) {
      std::cout << "Error, initial state empty, exiting" << std::endl;
      return Polygon();
   }

   // sweeping
   Polygon result;
   std::cout << "Sweeping .. " << std::endl;

   Edge* prev_top = *state.begin();
   // loop through events
   for (int i = 0; i < events.size(); ++i) {
      int j = i;
      // handle events at the (roughly) same angle
      while (i < events.size() && abs(events[i]->angle - events[j]->angle) < GEOM_PRECISION) {
         // remove lines that have ended
         if (events[i]->p_orig == events[i]->edge_1->to)
            state.erase(events[i]->edge_1.get());
         if (events[i]->p_orig == events[i]->edge_2->to)
            state.erase(events[i]->edge_2.get());
         // add lines that have started but not ended
         bool cond_e1 = abs(events[i]->edge_1->p1_angle - events[i]->edge_1->p2_angle) > GEOM_PRECISION;
         bool cond_e2 = abs(events[i]->edge_2->p1_angle - events[i]->edge_2->p2_angle) > GEOM_PRECISION;
         if (events[i]->p_orig == events[i]->edge_1->from && cond_e1)
            state.insert(events[i]->edge_1.get());
         if (events[i]->p_orig == events[i]->edge_2->from && cond_e2)
            state.insert(events[i]->edge_2.get());
         ++i;
      }
      --i;

      // handle visible points
      if (state.empty()) { // rounding errors
         Point prev_intr;
         intersection(Line(*prev_top->from, *prev_top->to), Line(view_point, *events[i]->p_orig), prev_intr);
         if (result.empty() || EuclideanDistance(result.back(), prev_intr) > GEOM_PRECISION)
            result.push_back(prev_intr);
      }
      else {
         Edge* top = *state.begin();
         if (prev_top != top) {
            if (prev_top->to == top->from) {
               result.push_back(*top->from);
            }
            else if (events[j]->p_orig == top->from) {
               if (i != j) {
                  Point p; // collinear vertices, add previous farthest
                  intersection(Line(*prev_top->from, *prev_top->to), Line(view_point, *events[j]->p_orig), p);
                  result.push_back(p);
               }
               Point intr;
               intersection(Line(*top->from, *top->to), Line(view_point, *events[j]->p_orig), intr);
               double dist = EuclideanDistance(view_point, intr);
               for (int k = i; k > j; --k) { // add all other vertices at this angle
                  if (EuclideanDistance(view_point, *events[k]->p_orig) < dist + GEOM_PRECISION)
                     break;
                  result.push_back(*events[k]->p_orig);
               }
               result.push_back(intr);
            }
            else if (events[j]->p_orig == prev_top->to) {
               result.push_back(*prev_top->to);
               Point intr;
               intersection(Line(*top->from, *top->to), Line(view_point, *events[j]->p_orig), intr);
               double max_dist = EuclideanDistance(view_point, intr);
               for (int k = j + 1; k <= i; ++k) { // add all collinear vertices at this angle
                  if (EuclideanDistance(view_point, *events[k]->p_orig) > max_dist + GEOM_PRECISION)
                     break;
                  result.push_back(*events[k]->p_orig);
               }
               result.push_back(intr);
            }
            prev_top = *state.begin();
         }
      }
   }
   if(EuclideanDistance(result.back(), result.front()) > GEOM_PRECISION)
      result.push_back(result.front());   // make sure result[0] == result[result.size()-1]
   std::cout << "Done" << std::endl;
   return result;
}

// compares two edges in state
bool VisPoly::EdgeComparator::operator()(const Edge* p1, const Edge* p2) const {
   // if they're the same
   if ((p1->from == p2->from && p1->to == p2->to) ||
      (p1->from == p2->to && p1->to == p2->from))
   {
      return false;
   }

   // if they share an endpoint check left/right turn
   if (p1->from == p2->to)
      return leftTurn(*p1->to, *p1->from, *p2->from);
   if (p1->from == p2->from)
      return !leftTurn(*p1->from, *p1->to, *p2->to);
   if (p1->to == p2->from)
      return leftTurn(*p1->from, *p1->to, *p2->to);
   if (p1->to == p2->to)
      return !leftTurn(*p1->from, *p1->to, *p2->from);

   // otherwise check intersection
   LineSegment l1(*p1->from, *p1->to);
   LineSegment l2(*p2->from, *p2->to);

   Point intr;
   if (intersection(l2, Ray(viewpoint, *p1->from), intr)) {
      double f = (*p1->from - viewpoint).getNorm();
      double s = (intr - viewpoint).getNorm();
      return f < s;
   }
   if (intersection(l2, Ray(viewpoint, *p1->to), intr)) {
      double f = (*p1->to - viewpoint).getNorm();
      double s = (intr - viewpoint).getNorm();
      return f < s;
   }
   if (intersection(l1, Ray(viewpoint, *p2->from), intr)) {
      double f = (*p2->from - viewpoint).getNorm();
      double s = (intr - viewpoint).getNorm();
      return s < f;
   }
   intersection(l1, Ray(viewpoint, *p2->to), intr);
   double f2 = (*p2->to - viewpoint).getNorm();
   double s2 = (intr - viewpoint).getNorm();

   return s2 < f2;
}

bool VisPoly::EventComparator::operator()(std::shared_ptr<Event>& a, std::shared_ptr<Event>& b) const {
   if (a->angle == b->angle)
      return EuclideanDistance(*a->p_orig, viewpoint) < EuclideanDistance(*b->p_orig, viewpoint);

   return a->angle < b->angle;
}
