 /*
    List the nations composed of islands by at least 99%.
    The result must include the name of the nation, the area of the nation, and the total area of the islands (hint: pay attention to the values ​obtained for the United Kingdom because it could be an indication of errors in the query).
    Write two versions of the query.
*/

SELECT c.name. c.area, x.sum_area
FROM country c 
INNER JOIN 
(SELECT gi.country,  SUM(i.area) as sum_area
FROM geo_island gi
INNER JOIN island i ON
gi.island = i.name
GROUP BY gi.country) x
ON c.name = x.country
WHERE (c.area * 0.99) <= x.sum_area;


