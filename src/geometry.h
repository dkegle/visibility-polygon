#pragma once

#include <vector>

const double GEOM_PRECISION = 1e-8;
const double pi = 3.141592653589793;

struct Point {
   Point() {}
   Point(double _x, double _y) : x(_x), y(_y) {}
   double x;
   double y;
   void normalize();

   double getNorm();

   Point operator+(const Point& p) const;
   Point operator-(const Point& p) const;

};

struct LineSegment {
   LineSegment(const Point& a, const Point& b) : A(a), B(b) {}
   Point A;
   Point B;
};

struct Ray {
   Ray(const Point& _from, const Point& _point) : from(_from), point(_point) {}
   Point from;
   Point point;  // point on ray
};

// infinite line
struct Line {
   Line(const Point& pnt1, const Point& pnt2) : point1(pnt1), point2(pnt2) {}
   Point point1;
   Point point2;
};

using Polygon = std::vector<Point>;

double getAngle(const Point& p, const Point& q);

bool ccwOriented(const Polygon& plg);

double dotProduct(const Point& A, const Point& B);

double ChebyshevDistance(const Point& A, const Point& B);
double EuclideanDistance(const Point& A, const Point& B);

// returns true if smaller is subset of bigger
bool isSubset(const LineSegment& smaller, const LineSegment& bigger);
bool isSubset(const LineSegment& smaller, const Ray& bigger);

double distance(const LineSegment& ls, const Point& pnt);

bool leftTurn(const Point& A, const Point& B, const Point& C);
bool rightTurn(const Point& A, const Point& B, const Point& C);

bool areCollinear(const Point& A, const Point& B, const Point& C);

bool forwardMove(const Point& A, const Point& B, const Point& C);

// returns true if line segment d1 intersects line segment d2, and false otherwise
bool intersectionExists(const LineSegment& d1, const LineSegment& d2);

// returns true if line segment d1 intersects line segment d2 and writes intersection coordinates 
// into parameter result, or returns false if intersection doesn't exist
bool intersection(const LineSegment& d1, const LineSegment& d2, Point& result);

// returns true if line segment d intersects ray r and writes intersection coordinates 
// into parameter result, or returns false if intersection doesn't exist
bool intersection(const LineSegment& d, const Ray& r, Point& result);

// returns true if line p intersects line q and writes intersection coordinates 
// into parameter result, or returns false if intersection doesn't exist
bool intersection(const Line& p, const Line& q, Point& result);
