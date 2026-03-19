"use client";

import { type ServiceNodeData, getCategoryColor } from "@/data/infrastructure";
import type { Node } from "@xyflow/react";

interface DetailPanelProps {
  node: Node<ServiceNodeData> | null;
  connectedNodes: { incoming: string[]; outgoing: string[] };
  onClose: () => void;
}

export default function DetailPanel({ node, connectedNodes, onClose }: DetailPanelProps) {
  if (!node) return null;

  const color = getCategoryColor(node.data.category);

  return (
    <div
      className="absolute top-4 right-4 w-80 rounded-xl border shadow-2xl z-50 overflow-hidden"
      style={{
        backgroundColor: "#0f0f14",
        borderColor: color.border,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: color.bg }}
      >
        <div>
          <div className="text-xs font-medium uppercase tracking-wider opacity-70" style={{ color: color.text }}>
            {node.data.category}
          </div>
          <div className="text-lg font-bold text-white">{node.data.label}</div>
        </div>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white text-xl leading-none p-1"
        >
          &times;
        </button>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-sm text-white/70 leading-relaxed">{node.data.description}</p>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Configuration</h4>
          <ul className="space-y-1">
            {node.data.details.map((detail, i) => (
              <li key={i} className="text-sm text-white/80 flex gap-2">
                <span className="text-white/30 mt-0.5">&#8226;</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {connectedNodes.incoming.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Receives from</h4>
            <div className="flex flex-wrap gap-1">
              {connectedNodes.incoming.map((name) => (
                <span
                  key={name}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {connectedNodes.outgoing.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Sends to</h4>
            <div className="flex flex-wrap gap-1">
              {connectedNodes.outgoing.map((name) => (
                <span
                  key={name}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
