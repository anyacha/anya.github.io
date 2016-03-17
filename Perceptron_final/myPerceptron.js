/* <!--project: my Perceptron - Anya Chaliotis -->
<!--work for UW, iSchool, INFX598 Advanced Data Vis, taught by Jessica Hullman -->
<!--inspired by INFX574 DataSciII, taught by Joshua Blumenstock --> */

//************************************ Part 0. Global variables ************************************//
var width = 500,
    height = 400,
    r = 29;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

//circle settings
var radius  = 29 //default radius
//************************************ Part 1. Perceptron: Data and global variables  ************************************//
var truth_input_pairs = [{x1: 1, x2: 1, color: -1}, {x1: 1, x2: 0, color: -1},{x1: 0, x2: 1, color: -1},{x1: 0, x2: 0, color: -1}];
var truth_input=[1,1,1,0,0,1,0,0]
var state_original = 1;
var weight =1;
var threshold;
var circles, labels;

//************************************ Part 2. Write SVG elements ************************************//

//Create svg elements - main part to display the graph
var svg = d3.select('#graph')
  .append('svg')
    .attr({width: width, height: height})
    //.attr("width", width + margin.left + margin.right)  //$goodcode
    //.attr("height", height + margin.top + margin.bottom)

var circle_setup = function(circle) {
  //console.log("inside circle setup: ", circle);
  circle.attr('r', radius)
        .attr('cx', function(d, i) { if (state_original) {if ((i % 2)==0) {return i*50+83} else {return i*50+70}} else {if (i==0 | i==1) {return 100} else if (i==2 | i==3) {return 200} else if (i==4 | i==5){return 300} else {return 400}}})
        .attr('cy', function() {if (state_original) {return 100} else {return 300}})
        .attr("fill", function(d) {if (d==0) {return "blue"} else {return "red"} })
        .style("fill-opacity", 0.2)
        .style("stroke", function(d) {if (d==0) {return "blue"} else {return "red"} }
        )
}

var circleText_setup = function(text) {
  text.text(function(d) { return d; })
        .attr('dx', function(d, i) { if (state_original) {if ((i % 2)==0) {return i*50+83-4} else {return i*50+70-4}} else {if (i==0 | i==1) {return 100-4} else if (i==2 | i==3) {return 200-4} else if (i==4 | i==5){return 300-4} else {return 400-4}}})
        .attr('dy', function() {if (state_original) {return 100+5} else {return 300+5}})
      
}

// Reusable drawing function
var draw = function(data) {
  //console.log("inside draw: " + data)
  // Bind self.settings.data
  var circles = svg.selectAll('circle').data(data)

  // Enter new elements
  circles.enter().append('circle').call(circle_setup)

  // Exit elements that may have left
  circles.exit().remove()

  // Transition all circles to new dself.settings.data
  svg.selectAll('circle').transition().duration(1500).call(circle_setup)  
}
var label = function(data) {
  //console.log("inside draw: " + data)
  // Bind self.settings.data
  var labels = svg.selectAll('text').data(data)

  // Enter new elements
  labels.enter().append('text').call(circleText_setup)

  // Exit elements that may have left
  labels.exit().remove()

  // Transition all circles to new dself.settings.data
  svg.selectAll('text').transition().duration(1500).call(circleText_setup)  
}

// Update function
var update = function(value) {
  switch(value) {
    case 1:
      console.log ('inside case 1')
      state_original=1;
      var data = truth_input
      break;
    case 2: 
      console.log ('inside case 2')
      state_original=0;
      var data = computePerceptron(truth_input, weight, 1.1);
      break;
    case 3:
      console.log ('inside case 3')
      state_original=1;
      var data = truth_input
      break;
    case 4: 
      console.log ('inside case 4')
      state_original=0;
      var data = computePerceptron(truth_input, weight, 0.9);
      break;
    default:
      console.log ('inside default')
      state_original=1;
      var data = truth_input
      break;
    
  }
  draw(data)
  label(data)
}

//******* Graph Scroll
var gs = graphScroll()
    .container(d3.select('#container'))
    .graph(d3.selectAll('#graph'))
    .sections(d3.selectAll('#sections > div'))
    .on('active', function(i){
      console.log(i + 'th section active');

      var pos = [ {cx: width - r,         cy: r},
                  {cx: r,                 cy: r},
                  {cx: width - r, cy: height - r},
                  {cx: width/2,   cy: height/2} ][i]
      /*if (i>0) 
        {update(i+1)} 
      else
        {update()};*/
      if (i>0) {console.log("updating: ", i); update(i)};
      
      });


//the end
d3.select('#source')
    .style({'margin-bottom': window.innerHeight - 500 + 'px', padding: '100px'})

//************************************ Perceptron functions ************************************//

//primitive ComputePerceptron functions - for real computations refer to myPerceptron1Layer and myPerceptron2Layers.code
function computePerceptron(data, weight, threshold) {
  //take a pair, apply weights and check against threshold
  //console.log ("inside computeP_AND: " + data)

  //compute Perceptron for each pair
  var truth_output = []
  var truth_pair_output=[]

  var i=0;
  for (var i=0; i< data.length; i+=2) {
    var value=data[i] * weight + data[i+1] * weight;
      if (value > threshold) {
        truth_pair_output=[1,1]
      } else {
        truth_pair_output=[0,0]
      }
    truth_output.push(truth_pair_output);
  }  

  //returned a new array calculated by Percepetron
  truth_output = [].concat.apply([], truth_output);
  
  return truth_output
  //return [1,1,0,0,0,0,0,0];
};


//************************************ end of Perceptron functions ************************************//
