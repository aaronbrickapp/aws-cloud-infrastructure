"use client";

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { type ServiceNodeData, getCategoryColor } from "@/data/infrastructure";

type ServiceNode = Node<ServiceNodeData, "service">;

export default function ServiceNode({ data, selected }: NodeProps<ServiceNode>) {
  const color = getCategoryColor(data.category);

  return (
    <div
      className="rounded-lg border-2 shadow-lg transition-all duration-200 min-w-[160px] max-w-[200px]"
      style={{
        backgroundColor: color.bg,
        borderColor: selected ? "#fff" : color.border,
        boxShadow: selected ? `0 0 20px ${color.border}80` : `0 2px 8px rgba(0,0,0,0.3)`,
        transform: selected ? "scale(1.05)" : "scale(1)",
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/40 !w-2 !h-2 !border-0" />
      <div className="px-3 py-2">
        <div
          className="text-xs font-medium uppercase tracking-wider opacity-70 mb-0.5"
          style={{ color: color.text }}
        >
          {data.category}
        </div>
        <div className="text-sm font-bold text-white">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-white/40 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-white/40 !w-2 !h-2 !border-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-white/40 !w-2 !h-2 !border-0" />
    </div>
  );
}
