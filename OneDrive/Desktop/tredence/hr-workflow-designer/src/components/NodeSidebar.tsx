import { useWorkflowStore } from "../hooks/useWorkflowStore";
import type { NodeType } from "../nodes/types";

const nodeDefs: { type: NodeType; label: string }[] = [
  { type: "start", label: "Start" },
  { type: "task", label: "Task" },
  { type: "approval", label: "Approval" },
  { type: "automated", label: "Automated Step" },
  { type: "end", label: "End" },
];

export default function NodeSidebar() {
  const addNode = useWorkflowStore((s) => s.addNode);

  const handleAdd = (type: NodeType) => {
    // new nodes appear near left-middle
    addNode(type, { x: 100, y: Math.random() * 300 + 50 });
  };

  return (
    <div className="w-40 border-r bg-gray-50 p-2 text-xs">
      <div className="font-semibold mb-2">Node Types</div>
      {nodeDefs.map((n) => (
        <button
          key={n.type}
          className="w-full border rounded mb-1 px-2 py-1 text-left hover:bg-white"
          onClick={() => handleAdd(n.type)}
          type="button"
        >
          {n.label}
        </button>
      ))}
    </div>
  );
}
