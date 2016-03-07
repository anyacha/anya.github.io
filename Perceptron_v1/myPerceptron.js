//src https://1wheel.github.io/graph-scroll/
console.log("INFX598 Project Perceptron: Scrollytelling");
console.log("previously: in v4 code - dynamic data for AND and OR; transition works; only bug - position after transition");
console.log("here: fix bug - position after transition");

//************************************ Part 0. Global variables ************************************//
var width = 500,
    height = 400

//circle settings
var r = 29 //default radius
var xScale, yScale
//************************************ Part 1. Perceptron: Data and global variables  ************************************//
//var truthPairs = [{x1: 1, x2: 1}, {x1: 1, x2: 0},{x1: 0, x2: 1},{x1: 0, x2: 0}];
var truth_input=[1,1,1,0,0,1,0,0]
var state_original = 1;
var weight =1;
var threshold;
//var circles, labels;

//************************************ Part 2. Write HTML elements ************************************//

//Create svg elements - main part to display the graph
var svg = d3.select('#graph')
  .append('svg')
    .attr({width: width, height: height})

var circle_setup = function(circle) {
  //console.log("inside circle setup: ", circle);
  circle.attr('r', r)
        //.attr('cx', function(d, i) { console.log("cx:", i,  xScale(i * 100 + 150)); return xScale(i * 100  + 150)})
        //.attr('cx', function(d, i) { if ((i % 2)==0) {console.log("cx:", i,  xScale(i * 110  + 120)); return xScale(i * 110  + 120)} else {return xScale(i * 110  + 100)}})
        //.attr('cx', function(d, i) { if (state_original) {if ((i % 2)==0) {return xScale(i+2.2)} else {return xScale(i+2)}} else {if (i==0 | i==1) {return xScale(1)} else if (i==2 | i==3){return xScale(5)} else if (i==4 | i==5){return xScale(9)} else {return xScale(13)}}})
        //.attr('cx', function(d, i) { if (state_original) {if ((i % 2)==0) {return i*50+83} else {return i*50+70}} else {if (i==0 | i==1) {return xScale(1)} else if (i==2 | i==3){return xScale(5)} else if (i==4 | i==5){return xScale(9)} else {return xScale(13)}}})
        .attr('cx', function(d, i) { if (state_original) {if ((i % 2)==0) {return i*50+83} else {return i*50+70}} else {if (i==0 | i==1) {return 100} else if (i==2 | i==3) {return 200} else if (i==4 | i==5){return 300} else {return 400}}})
        //.attr('cy', function() {if (state_original) {console.log("state original"); return 100} else {console.log("state not original");return 300}
        .attr('cy', function() {if (state_original) {return 100} else {return 300}})
        .attr("fill", function(d) {if (d==0) {return "blue"} else {return "red"} })
        .style("fill-opacity", 0.2)
        .style("stroke", function(d) {if (d==0) {return "blue"} else {return "red"} })
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

// Draw initial data; Define data, xScale, yScale
//var data1 = [{x:0, y:1}, {x:1, y:1}] //, {x:3, y:1}]
console.log("w+h:" + width + height)
xScale = d3.scale.linear().range([0,width]).domain([1,10])
yScale = d3.scale.linear().range([height,0]).domain([1,10])
//draw(truthPairs)
//var data_orig=[{x:3, y:8, value:1},{x:8, y:8, value:1}, {x:14, y:8, value:1},{x:19, y:8, value:0}, {x:25, y:8, value:0},{x:30, y:8, value:1}, {x:37, y:8, value:0},{x:42, y:8, value:0}]
draw(truth_input) //dynamic input!
//draw(truthPairs)

// Update function (hard coded for now)
var update = function(value) {
  switch(value) {
    case 1:
      var data = truth_input
      //var data=[{x:20, y:1}, {x:40, y:1},{x:60, y:1}, {x:80, y:1},{x:100, y:1}, {x:120, y:1},{x:140, y:1}, {x:160, y:1}]
      break;
    case 2: 
      //var data = [{x:.5, y:10}, {x:.5, y:10}]
      state_original=0;
      var data = computePerceptronAND(truth_input, weight, 1.1);
      //var data = [1,1,0,0,0,0,0,0]
      //var data=[{x:1.5, y:10}, {x:1.5, y:10}, {x:3.5, y:10}, {x:3.5, y:10}, {x:5.5, y:10}, {x:5.5, y:10}, {x:7.5, y:10}, {x:7.5, y:10}];
      ////var data=[{x:1, y:5, value:1},{x:1, y:5, value:1}, {x:6, y:5, value:0},{x:6, y:5, value:0}, {x:11, y:5, value:0},{x:11, y:5, value:0}, {x:16, y:5, value:0},{x:16, y:5, value:0}]
      break;
    /*case 0:
      var data = truth_input
      break;*/
    default:
      state_original=1;
      var data = truth_input
      break;
  }
  draw(data)
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
      if (i>0) 
        {update(i+1)} 
      else
        {update()};
      //update(i+1);
      
      /* was 
        circle.transition().duration(1000)
          .attr(pos)
        .transition()
          .style('fill', colors[i])*/
      });

//************************************ Part 2.2 Write HTML elements ************************************//

var svg2 = d3.select('#graph2')
  .append('svg')
    .attr({width: width, height: height})

// Reusable drawing function
var draw2 = function(data) {
  // Bind self.settings.data
  var circles2 = svg2.selectAll('circle').data(data)

  // Enter new elements
  circles2.enter().append('circle').call(circle_setup)

  // Exit elements that may have left
  circles2.exit().remove()

  // Transition all circles to new dself.settings.data
  svg2.selectAll('circle').transition().duration(1500).call(circle_setup)  
}

// Draw initial data; Define data, xScale, yScale
//var data1 = [{x:0, y:1}, {x:1, y:1}] //, {x:3, y:1}]
//xScale = d3.scale.linear().range([0,width]).domain([1,10])
//yScale = d3.scale.linear().range([height,0]).domain([1,10])
draw2(truth_input)

// Update function
var update2 = function(value) {
  switch(value) {
    case 1:
      state_original=1;
      var data = truth_input
      break;
    case 2: 
      //var data = [{x:.5, y:10}, {x:.5, y:10}]
      state_original=0;
      var data = computePerceptronOR(truth_input, weight, .9);
      break;
    default:
      state_original=1;
      var data = truth_input;
      break;
  }
  draw2(data)
}


var gs2 = graphScroll()
    .container(d3.select('#container2'))
    .graph(d3.selectAll('#graph2'))
    .sections(d3.selectAll('#sections2 > div'))
    .on('active', function(i){
      console.log(i + 'th section active');

    var pos = [ {cx: width - r,         cy: r},
                  {cx: r,                 cy: r},
                  {cx: width - r, cy: height - r},
                  {cx: width/2,   cy: height/2} ][i]

    //was update2(i+1);
    if (i>0) 
        {update2(i+1)} 
      else
        {update2()};

    })

//************************************ Part 2.3 Write HTML elements ************************************//

//Create svg elements - main part to display the graph
var svg3 = d3.select('#graph3')
  .append('svg')
    .attr({width: width, height: height})

// Reusable drawing function
var draw3 = function(data) {
  // Bind self.settings.data
  var circles3 = svg3.selectAll('circle').data(data)

  // Enter new elements
  circles3.enter().append('circle').call(circle_setup)

  // Exit elements that may have left
  circles3.exit().remove()

  // Transition all circles to new dself.settings.data
  svg3.selectAll('circle').transition().duration(1500).call(circle_setup)  
}

// Draw initial data; Define data, xScale, yScale
//var data1 = [{x:0, y:1}, {x:1, y:1}] //, {x:3, y:1}]
//xScale = d3.scale.linear().range([0,width]).domain([1,10])
//yScale = d3.scale.linear().range([height,0]).domain([1,10])
draw3(truth_input)

// Update function
var update3 = function(value) {
  switch(value) {
    case 1:
      state_original=1;
      var data = truth_input
      break;
    case 2: 
      //var data = [{x:.5, y:10}, {x:.5, y:10}]
      state_original=0;
      var data = computePerceptronOR(truth_input, weight, .9);
      break;
    default:
      state_original=1;
      var data = truth_input;
      break;
  }
  draw3(data)
}

var gs3 = graphScroll()
    .container(d3.select('#container3'))
    .graph(d3.selectAll('#graph3'))
    .sections(d3.selectAll('#sections3 > div'))
    .on('active', function(i){
      console.log(i + 'th section active');

    var pos = [ {cx: width - r,         cy: r},
                  {cx: r,                 cy: r},
                  {cx: width - r, cy: height - r},
                  {cx: width/2,   cy: height/2} ][i]

    console.log("inside container3")

    if (i>0) 
        {update3(i+1)} 
      else
        {update3()};
    })


d3.select('#source')
    .style({'margin-bottom': window.innerHeight - 500 + 'px', padding: '100px'})

//******* Perceptron functions
function computePercepetron_original(pairs, weight, threshold) {
  //take a pair, apply weights and check against threshold
  var value=pairs[0] * weight + pairs[1] * weight;
  if (value > threshold) {
    return [1,1,0,0,0,0,0,0];
  } else {
    return [1,1,0,0,0,0,0,0];
  }

};

function computePerceptronAND(data, weight, threshold) {
  //take a pair, apply weights and check against threshold
  //console.log ("inside computeP_AND: " + data)

  //compute Percepetraon for each pair
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

function computePerceptronOR(data, weight, threshold) {
//take a pair, apply weights and check against threshold
  //console.log ("inside computeP_OR: " + data)

  //compute Percepetraon for each pair
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
/* was $acdelete var value=data[0].x * weight + data[1].x * weight;
  if (value > threshold) {
    return [{x:1, y:10}, {x:1, y:10}];
  } else {
    return [{x:0, y:10}, {x:0, y:10}];
  } */
};

/******************************  ORIGINAL DRAW CIRCLE FUNCTIONS  **********************************

// Circle positioning function
var circleFunc = function(circle) {
  circle.attr('r', r)
        //.attr('fill', 'blue')
        //.attr('cx', function(d,i) { console.log("i:" + (i+1 )* 5); return 40 + (i )* 60})
        .attr('cx', function(d) { return xScale(d.x)})
        .attr('cy', function(d) { return yScale(d.y)})
        .attr("fill", function(d) {if (d.value==0) {return "blue"} else {return "red"} })
        .style("fill-opacity", 0.4)
        .style("stroke", function(d) {if (d.value==0) {return "blue"} else {return "red"} })
}

// Reusable drawing function
var draw = function(data) {
  console.log("inside draw: " + data)
  // Bind self.settings.data
  var circles = svg.selectAll('circle').data(data)

  // Enter new elements
  circles.enter().append('circle').call(circleFunc)

  // Exit elements that may have left
  circles.exit().remove()

  // Transition all circles to new dself.settings.data
  svg.selectAll('circle').transition().duration(1500).call(circleFunc)  
}

/******************************  DELETE  **********************************
/*form Michael Freeman code - not used here; but do use Michael's functions: circleFunc(), draw(), and update()
// setup scroll functionality
var scroll = scroller()
    .container(d3.select('#container'));

// pass in .step selection as the steps
scroll(d3.selectAll('.step'));

// Pass in desired update function

// Pass the update function to the scroll object
scroll.update(update)
*/

/*var circleFunc = function(circle) {
    circle.attr("cx", function(d, i) {console.log("i: " + i + d); return (i + 1) * 100})
        .attr("cy", 100)
        .attr("r", 30)
        //.attr("fill", function(d) {if (d==0) {return "#aec7e8"} else {return "#ff9896"} });
        .attr("fill", function(d) {if (d==0) {return "blue"} else {return "red"} })
        .style("fill-opacity", 0.4)
        .style("stroke", function(d) {if (d==0) {return "blue"} else {return "red"} })
}


// Reusable drawing function
var draw = function(data) {
  console.log("data" + data)
    // Bind self.settings.data
    circles = svg.selectAll('circle').data(data)
  
    // Enter new elements
    circles.enter().append('circle').call(circleFunc)
  
    // Exit elements that may have left
    circles.exit().remove()
  
    // Transition all circles to new dself.settings.data
    svg.selectAll('circle').transition().duration(1500).call(circleFunc)  
}*/

// Define data, xScale, yScale
/*var data1 = [{x:1, y:2}, {x:4, y:4}, {x:3, y:1}]
var data2 = [{x:3, y:2}, {x:4, y:4}]
var xScale = d3.scale.linear().range([100,200]).domain([0,5])
var yScale = d3.scale.linear().range([100,200]).domain([0,5])*/
//draw(truthPair)


/*var circle = svg.append('circle')
    .attr({cx: 0, cy: 0, r: r})

var colors = ['orange', 'purple', 'steelblue', 'black']*/

/*graphScroll()
  .sections(d3.selectAll('#sections > div'))
  .on('active', function(i){
    console.log(i + 'th section active') })*/
