"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnSelectionChangeParams,
  BackgroundVariant,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ServiceNode from "./ServiceNode";
import DetailPanel from "./DetailPanel";
import Legend from "./Legend";
import {
  initialNodes,
  initialEdges,
  getCategoryColor,
  type ServiceNodeData,
} from "@/data/infrastructure";

const nodeTypes = { service: ServiceNode };

const defaultEdgeOptions = {
  type: "smoothstep",
  style: { stroke: "#ffffff30", strokeWidth: 1.5 },
  labelStyle: { fill: "#ffffff60", fontSize: 10, fontWeight: 500 },
  labelBgStyle: { fill: "#0f0f14", fillOpacity: 0.8 },
  labelBgPadding: [4, 2] as [number, number],
  labelBgBorderRadius: 4,
};

export default function InfrastructureDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<ServiceNodeData> | null>(null);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) return { incoming: [], outgoing: [] };

    const nodeMap = new Map(nodes.map((n) => [n.id, n.data.label]));

    const incoming = edges
      .filter((e) => e.target === selectedNode.id)
      .map((e) => nodeMap.get(e.source) || e.source);

    const outgoing = edges
      .filter((e) => e.source === selectedNode.id)
      .map((e) => nodeMap.get(e.target) || e.target);

    return { incoming, outgoing };
  }, [selectedNode, edges, nodes]);

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
      const node = selectedNodes[0] as Node<ServiceNodeData> | undefined;
      if (node) {
        setSelectedNode(node);

        // Highlight connected edges
        setEdges((eds) =>
          eds.map((e) => {
            const isConnected = e.source === node.id || e.target === node.id;
            return {
              ...e,
              style: {
                ...e.style,
                stroke: isConnected
                  ? getCategoryColor(node.data.category).border
                  : "#ffffff15",
                strokeWidth: isConnected ? 2.5 : 1,
              },
              labelStyle: {
                ...defaultEdgeOptions.labelStyle,
                fill: isConnected ? "#ffffffcc" : "#ffffff30",
              },
              animated: isConnected ? true : false,
            };
          })
        );
      } else {
        setSelectedNode(null);
        setEdges((eds) =>
          eds.map((e) => {
            const original = initialEdges.find((ie) => ie.id === e.id);
            return {
              ...e,
              style: {
                ...defaultEdgeOptions.style,
                ...original?.style,
              },
              labelStyle: defaultEdgeOptions.labelStyle,
              animated: original?.animated || false,
            };
          })
        );
      }
    },
    [setEdges]
  );

  return (
    <div className="w-screen h-screen bg-[#0a0a0f]">
      <div className="absolute top-4 left-4 z-50">
        <h1 className="text-xl font-bold text-white">Generic Cloud Infrastructure</h1>
        <p className="text-xs text-white/40 mt-0.5">
          Click a service to see details and connections
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#ffffff08" />
        <Controls
          className="!bg-[#1a1a24] !border-white/10 !rounded-lg [&>button]:!bg-[#1a1a24] [&>button]:!border-white/10 [&>button]:!text-white/60 [&>button:hover]:!bg-[#2a2a34]"
        />
        <MiniMap
          nodeColor={(n: Node) => {
            const data = n.data as ServiceNodeData;
            return getCategoryColor(data.category).border;
          }}
          maskColor="#0a0a0f90"
          className="!bg-[#0f0f14] !border-white/10 !rounded-lg"
        />
      </ReactFlow>

      <DetailPanel
        node={selectedNode}
        connectedNodes={connectedNodes}
        onClose={() => setSelectedNode(null)}
      />
      <Legend />
    </div>
  );
}
