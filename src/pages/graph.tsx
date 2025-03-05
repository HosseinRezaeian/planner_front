import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const CustomShapeGraph = () => {
    const graphData = {
        nodes: [
            { id: 'node1', name: 'Node 1', color: "green" },
            { id: 'node2', name: 'Node 2', color: "blue" },
            { id: 'node3', name: 'Node 3', color: "red" },
            { id: 'node4', name: 'Node 4', color: "blue" },
            { id: 'node5', name: 'Node 5', color: "green" },
            { id: 'node6', name: 'Node 6', color: "blue" },
            { id: 'node7', name: 'Node 7', color: "red" },
            { id: 'node8', name: 'Node 8', color: "blue" },
        ],
        links: [
            { source: 'node1', target: 'node2' },
            { source: 'node2', target: 'node3' },
            { source: 'node1', target: 'node3' },
            { source: 'node5', target: 'node4' },
            { source: 'node6', target: 'node4' },
            { source: 'node7', target: 'node4' },
            { source: 'node8', target: 'node4' },
            { source: 'node8', target: 'node2' },
            { source: 'node6', target: 'node1' },
            { source: 'node6', target: 'node2' },
        ],
    };

    return (
        <ForceGraph2D
            graphData={graphData}
            nodeLabel="name" // نمایش Tooltip هنگام hover
            nodeColor={(node) => node.color}
            nodeCanvasObject={(node, ctx) => {
                if (node.x === undefined || node.y === undefined) return;

                // رسم مربع به جای دایره
                const radius = 4; // شعاع دایره
                ctx.beginPath();

                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false); // رسم دایره
                ctx.fillStyle = node.color  ; // رنگ دایره
                ctx.fill();
                // نمایش Label

                const label = node.name;
                const fontSize = 12;
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'black';
                ctx.fillText(label, node.x, node.y + radius + 5);
            }}
        />
    );
};

export default CustomShapeGraph;