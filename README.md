## Problem statement:

Given a Single-Lane (Bi-directional) Road with N milestones where, N is element of Finite Positive Integers; identify the data structure and algorithm that would be suited to maintain the incoming requests for traveling on the Road.

For eg: If a Road of 0 to 1000 milestones receives a request R1 to traverse milestone number 31 to 60, it would block the road for 29 milliseconds (assuming each milestone is covered in 1 millisecond ) in that route. During this duration no other request should be allowed overlapping the route. A request R2 will be allowed if it travels outside the range of 31 to 60;

## Solution strategy:

When a stream of requests are received to travel on the Road described by the problem. We need to make sure the requests are executed in an efficient manner. 

An efficient approach would be to allow least time consuming travel on priority. There are drawbacks to this approach which will be discussed later.

A minimum Heap Binary tree seems like an ideal solution, where nodes would determine the duration of travel.

The root node of the min-Heap would always be the ideal candidate for request execution.

A request execution can always be blocked by an already running request in the same range. 

To identify such requests and defer their execution we need to check for overlap of requests and have a data structure in place to track the blocked requests because of the running request.


## Identify Overlap of Incoming Requests:

Image below shows a strategy to identify overlap, where S(a) and D(a) are source and destination of already allowed Requests in the list of allocated Requests. 

<img src="https://user-images.githubusercontent.com/1617638/89754318-0e4f2080-daf9-11ea-94da-2152bc9190e2.jpeg" width="300">


Whereas, S and D are sources and destinations of various requests that can overlap the existing allocated request (S(a) -> D(a)).


### Request Instance:

A request instance would have following properties:

Source and Destination: It would hold information of source and destination.
Dependents array: It would be the list of Requests that are blocked by the running (Active) Request Instance 
Subscribe Function to add blocked requests to dependents list, so that they could be notified once the Travel Request is completed.
Timestamp : To avoid time consuming request from not given the opportunity to execute.
isActive: To show whether a Request is actively running.


When a request instance is not blocked by any running instance, they are moved to execute till completion.

On completion of the request its associated dependent requests are passed again to form a Min-Heap continuing the cycle as we begun.


## Few Scenarios:

In a single unidirectional lane for Request to execute Source < Destination. But we have a bi-directional lane so Source > Destination.

2.  Larger duration trips missing the opportunity to execute:
	This scenario can be resolved by incremental approach mentioned as below:
	1. Set a hard time limit for Request elapsed unattended after which requests would be taken on highest priority.
	2. Putting a hard limit on duration of execution: Any request above the hard limit can be ignored by marking it invalid.
	3. Breaking the larger duration request into multiple small duration requests. (Not implemented)


## Implementation:

Visit https://codesandbox.io/s/github/sachinnair/scheduling/tree/master/ to view working version of the application as well as you can explore the code file.

You may also copy the link in codesandbox's browser to see the solution in new tab: (gif below shows the same)

![](https://user-images.githubusercontent.com/1617638/89753733-01313200-daf7-11ea-8f5c-352ce403f8c2.gif)




### Create random requests in the browser:

![](https://user-images.githubusercontent.com/1617638/89753730-fd051480-daf6-11ea-9498-c8d369f544cf.gif)

As seen in the gif above you may create some random requests and click on "Submit" to view the flow by which the entire execution of requests are completed. Sequence of events are logged with latest messages at the top.




### Time Complexity

Worst Case: O(n ^ 2);
Best Case: O(nlogn);




