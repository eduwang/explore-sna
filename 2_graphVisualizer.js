document.getElementById('drawGraphButton').addEventListener('click', function() {


});
 // Random tree
//  const N = 300;
//  const gData = {
//    nodes: [...Array(N).keys()].map(i => ({ id: i })),
//    links: [...Array(N).keys()]
//      .filter(id => id)
//      .map(id => ({
//        source: id,
//        target: Math.round(Math.random() * (id-1))
//      }))
//  };

//  const Graph = ForceGraph3D()
//    (document.getElementById('sigma-container'))
//      .graphData(gData);
import Graph from 'graphology';
import forceAtlas2 from "graphology-layout-forceatlas2";
import Sigma from "sigma";
import { cropToLargestConnectedComponent } from "graphology-components";
import circular from "graphology-layout/circular";
import Papa from "papaparse";


const graph = new Graph();
graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
graph.addEdge("1", "2", { size: 5, color: "purple" });

// Instantiate sigma.js and render the graph
const sigmaInstance = new Sigma(graph, document.getElementById("sigma-container"));
// const sigmaInstance = new Sigma(graph, document.getElementById("sigma-container"));


