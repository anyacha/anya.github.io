/* <!--project: my Perceptron - Anya Chaliotis -->
<!--work for UW, iSchool, INFX598 Advanced Data Vis, taught by Jessica Hullman -->
<!--inspired by INFX574 DataSciII, taught by Joshua Blumenstock --> */

//************************************ Part 0. Global variables ************************************//
var width = 500,
    height = 400,
    r = 29;
var margin = {top: 20, right: 20, bottom: 30, left: 50};

//circle settings
//var radius  = 29 //default radius

// prepare html needs
// set margins
//was, now
//var margin = {top: 20, right: 20, bottom: 30, left: 50};
//    var w = 960 - margin.left - margin.right;
//    var h = 500 - margin.top - margin.bottom;

//datasets and data structures
var dataset; //to hold full dataset, summarized datasets
var years = [];
var circles;

//init axes variables
var minYear, maxYear, maxYear_axes, y_min, y_dynamic_max ; 
minYear=1960;
maxYear=2013;
maxYear_axes=maxYear+2;
y_min=-1;
//************************************ Part 1. Perceptron: Data and global variables  ************************************//


//************************************ Part 2. Write SVG elements ************************************//
//Create svg elements - main to display the graph, and side for summaries and navigation
var svg = d3.select("#graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//add main svg elements
var x = d3.scale.linear()
        .domain([minYear-1, maxYear_axes])
        .range([0, width]);

var y = d3.scale.linear()
        .domain([0, 2050])
        .range([height, 0]);

function drawVis(data) {
  circles = svg.selectAll("circle")
   .data(data)

   // Add new circles 
    circles.enter().append("circle"); 

    // Remove circles 
    circles.exit().remove();
   //.enter()
   //.append("circle")

   circles
    .attr("cx", function(d) { return x(d.year);  })
    .attr("cy", function(d) { return y(d.count);  })
    .attr("r", function(d) { if(d.count>0 && d.count<=200) { return 3;} else if(d.count>200 && d.count<1300) {return d.count * .015;} else {return d.count * .012;}})
    .style("stroke", "black")
    .style("stroke", "black")
     //.style("fill", function(d) { return colLightness(d.vol); })
    .style("fill", function(d) { if(d.status_id== 0) { return "green";} else if(d.status_id== 1) { return "yellow";} else if(d.status_id== 2) { return "red";} })
    .style("opacity", 0.6)

    .on("mouseover", function(d) {
        svg.selectAll('circle')
        .filter(function (dOther) { return d.status_id == dOther.status_id })
        .style('opacity', 1.0)
        .attr("r",function(dLast) { if(dLast.count>0 && dLast.count<=200) { return 6;} else if(dLast.count>200 && dLast.count<1300) {return dLast.count * .030;} else {return dLast.count * .018;}})
    })
    .on("mouseout", function(d) {
        svg.selectAll('circle')
        .filter(function (dOther) { return d.status_id == dOther.status_id })
        .style('opacity', 0.6)
        .attr("r",function(dLast) { if(dLast.count>0 && dLast.count<=200) { return 3;} else if(dLast.count>200 && dLast.count<1300) {return dLast.count * .015;} else {return dLast.count * .012;}})
    })   

}

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10)
    .tickFormat(d3.format("i"));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
     .append("text")
      .attr("x", width - 200)
      .attr("y", +30)
      .style("text-anchor", "end")
      .text("Construction Year");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

svg.append("g")
   .attr("class", "axis")
   .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");






//Create svg elements - main part to display the graph
/*var svg = d3.select('#graph')
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
*/

// Update function
var update = function(value) {
  switch(value) {
    case 1:
      console.log ('inside case 1')
      state_original=1;
      // load data from csv file
      d3.csv("data/dynamic_water_status_byYear.csv", function(error, water) {
        
        //read in the data - original dataset
        if (error) return console.warn(error);
          
           water.forEach(function(d) {
              d.Year = +d.year;
              d.Status_id=+d.status_id
              d.Value = +d.count;
           });
         dataset=water;
         //initVis(dataset);

         //enumearate main data structures
        //get a list of years that data was recorded for (because some years are missing)
        years=d3.range(minYear,maxYear+1)
        
        //drawVis(dataset)
         //animate
        var year_idx=0;
        var year_interval= setInterval(function () {
          filterData(minYear,years[year_idx]);
          year_idx++;
          
          if(year_idx>=years.length) {
            clearInterval(year_interval);
          }
        }, 20);
        
      });
      break;
    case 2: 
      console.log ('inside case 2')
      state_original=0;
      // load data from csv file
      d3.csv("data/dynamic_water_status_byYear.csv", function(error, water) {
        
        //read in the data - original dataset
        if (error) return console.warn(error);
          
           water.forEach(function(d) {
              d.Year = +d.year;
              d.Status_id=+d.status_id
              d.Value = +d.count;
           });
         dataset=water;
         //initVis(dataset);

         //enumearate main data structures
        //get a list of years that data was recorded for (because some years are missing)
        years=d3.range(minYear,maxYear+1)
        
        //drawVis(dataset)
         //animate
        var year_idx=0;
        var year_interval= setInterval(function () {
          filterData(minYear,years[year_idx]);
          year_idx++;
          
          if(year_idx>=years.length) {
            clearInterval(year_interval);
          }
        }, 20);
        
      });
      break;
    case 3:
      console.log ('inside case 3')
      state_original=1;// load data from csv file
      d3.csv("data/dynamic_water_status_byYear.csv", function(error, water) {
        
        //read in the data - original dataset
        if (error) return console.warn(error);
          
           water.forEach(function(d) {
              d.Year = +d.year;
              d.Status_id=+d.status_id
              d.Value = +d.count;
           });
         dataset=water;
         //initVis(dataset);

         //enumearate main data structures
        //get a list of years that data was recorded for (because some years are missing)
        years=d3.range(minYear,maxYear+1)
        
        //drawVis(dataset)
         //animate
        var year_idx=0;
        var year_interval= setInterval(function () {
          filterData(minYear,years[year_idx]);
          year_idx++;
          
          if(year_idx>=years.length) {
            clearInterval(year_interval);
          }
        }, 20);
        
      });var data = truth_input
      break;
    case 4: 
      console.log ('inside case 4')
      state_original=0;
      // load data from csv file
      d3.csv("data/dynamic_water_status_byYear.csv", function(error, water) {
        
        //read in the data - original dataset
        if (error) return console.warn(error);
          
           water.forEach(function(d) {
              d.Year = +d.year;
              d.Status_id=+d.status_id
              d.Value = +d.count;
           });
         dataset=water;
         //initVis(dataset);

         //enumearate main data structures
        //get a list of years that data was recorded for (because some years are missing)
        years=d3.range(minYear,maxYear+1)
        
        //drawVis(dataset)
         //animate
        var year_idx=0;
        var year_interval= setInterval(function () {
          filterData(minYear,years[year_idx]);
          year_idx++;
          
          if(year_idx>=years.length) {
            clearInterval(year_interval);
          }
        }, 20);
        
      });
      break;
    default:
      console.log ('inside default')
      state_original=1;
      // load data from csv file
      d3.csv("data/dynamic_water_status_byYear.csv", function(error, water) {
        
        //read in the data - original dataset
        if (error) return console.warn(error);
          
           water.forEach(function(d) {
              d.Year = +d.year;
              d.Status_id=+d.status_id
              d.Value = +d.count;
           });
         dataset=water;
         //initVis(dataset);

         //enumearate main data structures
        //get a list of years that data was recorded for (because some years are missing)
        years=d3.range(minYear,maxYear+1)
        
        //drawVis(dataset)
         //animate
        var year_idx=0;
        var year_interval= setInterval(function () {
          filterData(minYear,years[year_idx]);
          year_idx++;
          
          if(year_idx>=years.length) {
            clearInterval(year_interval);
          }
        }, 20);
        
      });
      break;
    
  }
  //draw(data)
  //label(data)
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


//************************************ Part 3 - Filter for animation ************************************////
// Filter parts

//define filter function - filter dataset based on parameters
function filterData(startYear, endYear){
  console.log("inside filterData" + startYear + endYear );
  var fDataset;

  // filter by years
  fDataset=dataset.filter(function(d){return d.year>=startYear && d.year<=endYear});
  //ready to draw circles
  drawVis(fDataset);
  
};


//************************************ Perceptron functions ************************************//

//primitive ComputePerceptron functions - for real computations refer to myPerceptron1Layer and myPerceptron2Layers.code
/*function computePerceptron(data, weight, threshold) {
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
*/

//************************************ end of Perceptron functions ************************************//
