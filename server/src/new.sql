The tree structure of an index is determined by the order of the columns in the CREATE INDEX statement. That means

CREATE INDEX Foobar ON Customers (state_code, city_name);
is logically the same as, but functionally different from:

CREATE INDEX Barfoo ON Customers (city_name, state_code);

Picking secondary indexes is an NP-Complete problem, so you cannot have a general method for creating them. The best you can do is to follow a few simple heuristics. The first heuristic is not to over-index. Newbies like to add lots of indexes to make their queries faster. This is not always true; the optimizer will ignore the ones it does not use so they become “dead code” in effect. But every insert, update and delete statement will have to change these useless indexes when a base table changes. This can be a lot of overhead.

The second heuristic is that if a column is never used in a search condition (that means in a WHERE, ON or HAVING clause) then it probably should not be in an index.

The third heuristic is that you should not have indexes with a common prefix list of columns. 