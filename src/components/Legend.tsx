"use client";

import { categories, getCategoryColor } from "@/data/infrastructure";

export default function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-[#0f0f14]/90 backdrop-blur-sm border border-white/10 rounded-xl p-3 z-50">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Services</h4>
      <div className="grid grid-cols-3 gap-x-4 gap-y-1">
        {categories.map((cat) => {
          const color = getCategoryColor(cat.id);
          return (
            <div key={cat.id} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color.border }}
              />
              <span className="text-xs text-white/70">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
