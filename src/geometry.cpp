#include "geometry.h"

#include <algorithm>

void Point::normalize() {
   double length = sqrt(x*x + y*y);
   x /= length;
   y /= length;
}

Point Point::operator+(const Point& p) const {
   return Point(this->x + p.x, this->y + p.y);
}

Point Point::operator-(const Point& p) const {
   return Point(this->x - p.x, this->y - p.y);
}

double Point::getNorm() {
   return sqrt(x*x + y*y);
}

double ChebyshevDistance(const Point& A, const Point& B) {
   double dx = B.x - A.x;
   dx = dx > 0 ? dx : -dx;

   double dy = B.y - A.y;
   dy = dy > 0 ? dy : -dy;

   return dx > dy ? dx : dy;
}

double getAngle(const Point& p, const Point& q) {
   Point p1(p);
   p1.normalize();

   Point q1(q);
   q1.normalize();

   double c = dotProduct(p1, q1);
   if (c < -1.0)
      c = -1.0;
   else if (c > 1.0)
   c = 1.0;

   double angle = acos(c);

   if (p.x*q.y - p.y*q.x < 0)
      return 2.0*pi - angle;
   return angle;
}

double EuclideanDistance(const Point& A, const Point& B) {
   return sqrt((A.x - B.x)*(A.x - B.x) + (A.y - B.y)*(A.y - B.y));
}
double dotProduct(const Point& A, const Point& B) {
   return A.x*B.x + A.y*B.y;
}

bool isSubset(const LineSegment& smaller, const LineSegment& bigger) {
   bool condition_1 = distance(bigger, smaller.A) < GEOM_PRECISION;
   bool condition_2 = distance(bigger, smaller.B) < GEOM_PRECISION;
   return condition_1 && condition_2;
}

bool isSubset(const LineSegment& smaller, const Ray& bigger) {
   Point v1(smaller.A.x - bigger.from.x, smaller.A.y - bigger.from.y);
   v1.normalize();

   Point v2(smaller.B.x - bigger.from.x, smaller.B.y - bigger.from.y);
   v2.normalize();

   return abs(v1.x - v2.x) < GEOM_PRECISION && abs(v1.y - v2.y) < GEOM_PRECISION;
}

double distance(const LineSegment& ls, const Point& pnt) {
   double d = EuclideanDistance(ls.A, ls.B);
   if (d < GEOM_PRECISION)
      return EuclideanDistance(ls.A, pnt);
   Point dir(ls.B.x - ls.A.x, ls.B.y - ls.A.y);
   Point r(pnt.x - ls.A.x, pnt.y - ls.A.y);
   double t = std::max(0.0, std::min(1.0, dotProduct(r, dir) / d / d));

   // projection of point on line
   double px = ls.A.x + t*(ls.B.x - ls.A.x);
   double py = ls.A.y + t*(ls.B.y - ls.A.y);
   return EuclideanDistance(Point(px, py), pnt);
}

bool intersectionExists(const LineSegment& d1, const LineSegment& d2) {
   if (distance(d1, d2.A) < GEOM_PRECISION || distance(d1, d2.B) < GEOM_PRECISION ||
      distance(d2, d1.A) < GEOM_PRECISION || distance(d2, d1.B) < GEOM_PRECISION)
   {
      return true;
   }

   bool l1 = leftTurn(d1.A, d1.B, d2.A);
   bool l2 = leftTurn(d1.A, d1.B, d2.B);
   bool l3 = leftTurn(d2.A, d2.B, d1.A);
   bool l4 = leftTurn(d2.A, d2.B, d1.B);

   return l1 != l2 && l3 != l4;
}

bool intersection(const LineSegment& d, const Ray& r, Point& result) {
   // intersection of two infinite lines
   bool intr = intersection(Line(d.A, d.B), Line(r.from, r.point), result);
   if (!intr)
      return false;

   // distance of pnt from line should be small
   double dist = distance(d, result);

   // and pnt should be on left side of the plane
   Point E(-(r.point.y - r.from.y), r.point.x - r.from.x);
   Point F(r.from.x + E.x, r.from.y + E.y);

   return dist < GEOM_PRECISION && leftTurn(F, r.from, result);
}

bool intersection(const LineSegment& d1, const LineSegment& d2, Point& result) {
   if (!intersectionExists(d1, d2))
      return false;

   return intersection(Line(d1.A, d1.B), Line(d2.A, d2.B), result);
}

bool intersection(const Line& p, const Line& q, Point& result) {
   double d = (p.point1.x - p.point2.x)*(q.point1.y - q.point2.y) -
      (p.point1.y - p.point2.y)*(q.point1.x - q.point2.x);
   if (abs(d) < GEOM_PRECISION)  // lines are nearly parallel
      return false;

   double f1 = p.point1.x*p.point2.y - p.point1.y*p.point2.x;
   double f2 = q.point1.x*q.point2.y - q.point1.y*q.point2.x;
   double x = f1*(q.point1.x - q.point2.x) - f2*(p.point1.x - p.point2.x);
   double y = f1*(q.point1.y - q.point2.y) - f2*(p.point1.y - p.point2.y);

   result = Point(x / d, y / d);
   return true;
}

bool leftTurn(const Point& A, const Point& B, const Point& C) {
   double p = B.x*(C.y - A.y) - A.x*C.y;
   double r = B.y*(C.x - A.x) - A.y*C.x;
   return p > r;
}

bool rightTurn(const Point& A, const Point& B, const Point& C) {
   double p = B.x*(C.y - A.y) - A.x*C.y;
   double r = B.y*(C.x - A.x) - A.y*C.x;
   return p < r;
}

bool areCollinear(const Point& A, const Point& B, const Point& C) {
   return abs((B.y - A.y)*(C.x - A.x) - (C.y - A.y)*(B.x - A.x)) < GEOM_PRECISION;
}

bool forwardMove(const Point& A, const Point& B, const Point& C) {
   if (!areCollinear(A, B, C))
      return false;
   return EuclideanDistance(A, B) < EuclideanDistance(A, C);
}

bool ccwOriented(const Polygon& plg) {
   // via signed area
   double sum = 0.0;
   for (int i = 0; i < plg.size() - 1; ++i)
      sum += (plg[i + 1].x - plg[i].x)*(plg[i + 1].y + plg[i].y);
   sum += (plg[plg.size() - 1].x - plg[0].x)*(plg[plg.size() - 1].y + plg[0].y);
   return sum < 0;
}
