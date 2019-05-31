bar();
bubble();
scatter();

function bar(){

var svg = d3.select("svg"),
margin = {
	top: 20,
	right: 20,
	bottom: 30,
	left: 50
},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom-40,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
	.rangeRound([0, width])
	.padding(0.1);

var y = d3.scaleLinear()
	.rangeRound([height, 0]);

d3.csv("data.csv").then(function (data) { 

console.log(data);

var data1 = data.filter(function(d) { return d.Cities;});



data.sort(function(a, b) {
        return a.CRIM - b.CRIM;
      });
	  
	  
	  
	x.domain(data.map(function (d) {
			return d.Cities;
		}));
	y.domain([0, d3.max(data, function (d) {
				return Number(d.CRIM);
			})]);
			
		
var avgline = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(data[i][1]); });
	
	
var avgline = d3.line()
  //.x(function(d, i) { return xScale(i); })
  //.y(function(d, i) { return yScale(avgdataset(i)); });
  .x(function(d, i) {
    return x(d[0]);
  })
  .y(function(d, i) {
    return y(d[i]);
  });

		
	
	  

	g.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x).tickSizeOuter(0))
	.selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

	g.append("g")
	.call(d3.axisLeft(y))
	.append("text")
	.attr("fill", "#000")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.text("CRIM");
	
	g.append("line")
    .attr("x1", 0)
    .attr("y1", function(d,i) { return 200; })
    .attr("x2", 10)
    .attr("y2", function(d,i) { return 200; });

	g.selectAll(".crime")
	.data(data)
	.enter().append("rect")
	.attr("class", "bar")
	.style("fill",function(d){
		if(d.CRIM > 0.7){
		return "#e15759";
		console.log(d);
		}else{
		
			return "#bab0ac";
		}
	})
	.attr("x", function (d) {
		return x(d.Cities);
	})
	.attr("y", function (d) {
		return y(Number(d.CRIM));
	})
	.attr("width", x.bandwidth())
	.attr("height", function (d) {
		return height - y(Number(d.CRIM));
	});
});

}


/////////////////////////


function bubble(){


				
	d3.csv("data.csv").then(function (data) {
				


var objString = JSON.stringify(data); 
    var res = '{"children":'+objString+'}';
    var dataset = JSON.parse(res);
	console.log(dataset);
	
	
	 // var obj = JSON.parse(two);

     /*   dataset = {
            "children": [{"Cities":"Olives","PTRATIO":4319},
                {"Cities":"Tea","PTRATIO":4159},
                {"Cities":"Mashed Potatoes","PTRATIO":2583},
                {"Cities":"Boiled Potatoes","PTRATIO":2074},
                {"Cities":"Milk","PTRATIO":1894},
                {"Cities":"Chicken Salad","PTRATIO":1809},
                {"Cities":"Vanilla Ice Cream","PTRATIO":1713},
                {"Cities":"Cocoa","PTRATIO":1636},
                {"Cities":"Lettuce Salad","PTRATIO":1566}
				]
        };
		
	*/

        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemePaired);

        var bubble = d3.pack(dataset)
            .size([600, 600])
            .padding(1.5);

        var svg = d3.select(".bubble")
            .append("svg")
            .attr("width", 600)
            .attr("height", 600)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.PTRATIO; });

        var node = svg.selectAll(".bubble")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
                return d.Cities + ": " + d.PTRATIO;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Cities.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
			.style("font-size","15px")
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.PTRATIO;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
			.style("font-size","17px")
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");
});


}


function scatter(){

var margin = {top: 30, right: 50, bottom: 40, left:40};
	var width = 1300 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var svg = d3.select('.scatter')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	// The API for scales have changed in v4. There is a separate module d3-scale which can be used instead. The main change here is instead of d3.scale.linear, we have d3.scaleLinear.
	var xScale = d3.scaleLinear()
		.range([0, width]);

	var yScale = d3.scaleLinear()
		.range([height, 0]);

	// square root scale.
	var radius = d3.scaleSqrt()
		.range([2,5]);

	// the axes are much cleaner and easier now. No need to rotate and orient the axis, just call axisBottom, axisLeft etc.
	var xAxis = d3.axisBottom()
		.scale(xScale);

	var yAxis = d3.axisLeft()
		.scale(yScale);

	// again scaleOrdinal
	var color = d3.scaleOrdinal(d3.schemePaired);

d3.csv("data.csv").then(function (data) { 
	
	console.log(data);
	
		data.forEach(function(d){
			 d.MEDV = +d.MEDV;
			 d.LSTAT = +d.LSTAT;
		});

		xScale.domain(d3.extent(data, function(d){
			return d.MEDV; // Median value of owner occupied
		})).nice();

		yScale.domain(d3.extent(data, function(d){
			return d.LSTAT;  // Lstat
		})).nice();

		

		// adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis. 
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'x axis')
			.call(xAxis);

		// y-axis is translated to (0,0)
		svg.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', 'y axis')
			.call(yAxis);


		var bubble = svg.selectAll('.bubble')
			.data(data)
			.enter().append('circle')
			.attr('class', 'bubble')
			.attr('cx', function(d){return xScale(d.MEDV);})
			.attr('cy', function(d){ return yScale(d.LSTAT); })
			.attr('r', function(d){ return 10; })
			.style('fill', '#9fbff2');

		

		// adding label. For x-axis, it's at (10, 10), and for y-axis at (width, height-10).
		svg.append('text')
			.attr('x', 10)
			.attr('y', 10)
			.attr('class', 'label')
			.text('MEDV');


		svg.append('text')
			.attr('x', width)
			.attr('y', height - 10)
			.attr('text-anchor', 'end')
			.attr('class', 'label')
			.text('LSTAT');

		
});

}