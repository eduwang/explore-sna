/** 
// Create a graphology graph
const graph = new graphology.Graph();
graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
graph.addNode("2", { label: "Node 3", x: 1, y: 1, size: 20, color: "red" });
graph.addEdge("1", "2", { size: 5, color: "purple" });

// Instantiate sigma.js and render the graph
const sigmaInstance = new Sigma(graph, document.getElementById("container"));
*/

// import Graph from "graphology";
const { Graph } = graphology;
// const { Sigma } = sigma;
// import Sigma from "sigma";
import { detectEncoding,decodeText } from "./data_shower.js";

// import { cropToLargestConnectedComponent } from "graphology-components";
// import forceAtlas2 from "graphology-layout-forceatlas2";
// import circular from "graphology-layout/circular";


const graph = new Graph();
graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
graph.addEdge("1", "2", { size: 5, color: "purple" });

// Instantiate sigma.js and render the graph
const sigmaInstance = new Sigma(graph, document.getElementById("container"));

export function handleFileforGraph() {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const encoding = detectEncoding(arrayBuffer);
            const text = decodeText(arrayBuffer, encoding); // Decode the text with detected encoding
            parseCSVforGraph(text);
        };
        reader.readAsArrayBuffer(file);
        console.log("csv file found")
    }
}

function parseCSVforGraph(text) {
    Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            const data = results.data;
            data.forEach(row => {
                const { From, To, Weight } = row;
                if (!graph.hasNode(From)) {
                    graph.addNode(From, { label: `Node ${From}`, size: 10 });
                }
                if (!graph.hasNode(To)) {
                    graph.addNode(To, { label: `Node ${To}`, size: 10 });
                }
                if (!graph.hasEdge(From, To)) {
                    graph.addEdge(From, To, { weight: Weight });
                }
            });
            sigmaInstance.refresh();
        }
    });
}

