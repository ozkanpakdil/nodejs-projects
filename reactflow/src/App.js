import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

// import ConnectionLine from "./ConnectionLine";

import SimpleFloatingEdge from './SimpleFloatingEdge';
import CustomNode from './CustomNode';

import './index.css';

const nodeDefaults = {
  style: {
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: 67,
    height: 67,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const initialNodes = [
  {
    id: "n1",
    type: "input",
    data: { label: "2.784kW" },
    position: { x: 150, y: 100 },
    ...nodeDefaults,
  },
  {
    id: "n2",
    type: "input",
    data: { label: "0.002kW" },
    position: { x: 350, y: 100 },
    ...nodeDefaults,
  },
  {
    id: "n3",
    type: "input",
    data: { label: "2.441kW" },
    position: { x: 150, y: -70 },
    ...nodeDefaults,
  },
  {
    id: "n4",
    type: "input",
    data: { label: "0.138kW" },
    position: { x: 350, y: -70 },
    ...nodeDefaults,
  },
  {
    id: "n5",
    type: "input",
    data: {
      label: "Heater"
    },
    position: { x: 250, y: 20 },
    type:'custom',
    className: 'heater',
  },
];

const initialEdges = [
  {
    source: "n1",
    target: "n5",
    targetHandle: "a1",
    animated: true,
    style: { stroke: "red" },
  },
  {
    source: "n2",
    target: "n5",
    targetHandle: "a2",
    animated: true,
    style: { stroke: "red" },
  },
  {
    source: "n3",
    target: "n5",
    targetHandle: "b1",
    animated: true,
    style: { stroke: "red" },
  },
  {
    source: "n4",
    target: "n5",
    targetHandle: "b2",
    animated: true,
    style: { stroke: "red" },
  },
];

const ConnectionLineFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: 1280, height: 768 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // connectionLineComponent={ConnectionLine}
        onConnect={onConnect}
        snapToGrid={true}
        fitView
        attributionPosition="top-right"
      >
        <Background variant="lines" />
      </ReactFlow>
    </div>
  );
};

export default ConnectionLineFlow;
