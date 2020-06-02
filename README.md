# Documentation for SRIP PROJECT - Delay Estimation of Chain of Inverters

### Introduction: 

Common challenges that chip designers face is that how large should be the transistors and how many stages of logic can give least delay. In other words how to optimize gate size to minimize the delay of a logic path.


The method of logical effort is one of the methods used to estimate delay in a CMOS circuit. The model describes delay caused by the capacitive load that the logic gate drives and by the topology of the logic gate. As the gate increases delay also increases, but delay depends on the logic function of the gate also.

---

### Delay in a Logic Circuit

Gate delay can be estimated from following formula.

D= p + h

Where, p is an intrinsic delay
               h is an effort delay

Effort delay is a product of logical effort and electrical effort. 

h= g x f

where, g is logical effort which is a ratio of gate inputâ€™s capacitance to the inverter capacitance when sized to deliver the same current and f is an electrical effort (f= Cout/Cin) which is a function of load/gate size. Logical effort of an inverter is 1.

#### In this experiment, it will be learnt how a delay can be reduced by changing the gate size of an inverter. The following figure shows what actually is meant by delay here

![Image](http://cse14-iiith.vlabs.ac.in/final-build/dintro.jpg)

---

### Delay Estimation In Chain Of Inverters

In this experiment, our goal is to calculate the propagation delay when some load is driven by a chain of inverters. To start with, let us consider simple case of a single inverter driving a capacitative load CL as shown in the following figure

![Image](http://cse14-iiith.vlabs.ac.in/final-build/t51.jpg)

Now we want to optimize size of the inverter, x, when driven by a source resistance Rs and driving a load of CL .


To drive CL fastly, we can make inverter size very large but then Rs will become very slow while driving such large size inverter as its input capacitance will be very large on increasing size by large amount.


If we reduce the size of an inverter and make it very small such that Rs drive it very quickly, then the delay to drive load capacitance will increase. So there is an optimal point in between these two conditions and we will see that optimal point further in this section


One thing that should be remebered is the effect of scaling of size of an inverter on its resistance and capacitance value. Suppose the size of an inverter has been scaled by a factor x, then its resistance will get reduced by the same factor while its capacitance will be increased by the same factor.


For getting optimum size of inverter, we differentiate the delay with respect to size. And when we put that value of size in the expressions of delay at the input of an inverter and delay in output, we get the same expressions. So we can summarize the optimal result for the above figure as below:


An inverter is scaled for optimium delay when the RC product of its input capacitance and the external resistance driving it, equals the RC product of its output resistance and the external load that it drives.


Now we will extend this concept for a chain of inverters as shown below
![Image](http://cse14-iiith.vlabs.ac.in/final-build/t53.jpg)

As we have seen earlier that to minimize delay, the RC product at input and output of an inverter should be same. Similar is the case with chain of inverters. Therefor the optimum size of each inverter is the geometric mean of its neighbors - meaning that if each inverter is sized up by the same factor x with respect to the preceding inverter, it will have the same effective RC product and hence the same delay.

Now we just have to see what is the value of x. The value of x derived by differentiating delay expression is nth root of CL/Cg1 where


     n is equal to the number of inverters in the chain 
     CL is equal to the load capacitance
     Cg1 is equal to the input gate capacitance of the first inverter
So expression for x is shown below

![Image](http://cse14-iiith.vlabs.ac.in/final-build/t54.jpg)



## Objective:

To study the effect of gate sizing in chain of inverters on its output delay.

## Procedure:

1. With The help of [About](https://github.com/anushkayadav/vlsi-iiith/blob/master/SRIP/Codes/About.txt) Page , try to build the Circuit.
2. Simulate and analyse the graph.


# Technical Details:

## Languages Used:
1. HTML
2. CSS
3. Javascript

## Libraries Used:
1. [Bootstrap](https://getbootstrap.com/) 
2. [jQuery](https://jquery.com/)
3.  [Popper.js](https://popper.js.org/)

## Implementation:

### Files

#### index.html

##### Overview:
html page of the module.

Layout is divided into 4 parts.

Part 1 : Tools with Simulate , Help and Reset buttons.

Part 2 : Drop Zone , this is where the components will dropped and connected.

Part 3 : Graph Area, this is where the graph will displayed after validatinf the circuit on clicking "Simulate" button.

Part 4 : Count Badges , these are the counts of various connections in the circuit.

##### Technicalities
Used html and bootstrap to design the layout of the simulator.

#### main.js

##### Overview:
This file manages all the local variables and functions that will be called on pressing various buttons in the simulator.

##### Technicalities:

1. input() : Function to add Input terminal (grey) to all the dropped components.

2. output() : Function to add Output terminal (green) to all the dropped components.

3. interact(): Fucntion to make connections between various components.

4. renderDiagram(): Function which drops the Components from tool box to Drop Zone.

5. $( ".button" ).click(function() : Function to Reset the simulator to initial conditions.

6. $( ".simulate" ).click(function() : Function to validate the circuit and display graph.






