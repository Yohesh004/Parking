import { useState } from "react";
import { useWorkflowStore } from "../hooks/useWorkflowStore";
import { simulateWorkflow } from "../api/mockApi";
import type { SimulationResult, SimulationRequest } from "../api/mockApi";

export default function SandboxPanel() {
  const { nodes, edges } = useWorkflowStore((s) => ({
    nodes: s.nodes,
    edges: s.edges,
  }));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleRun = async () => {
    const payload: SimulationRequest = { nodes, edges };

    setLoading(true);
    try {
      const res = await simulateWorkflow(payload);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t p-2 text-xs h-40 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">Workflow Sandbox</div>
        <button
          className="border rounded px-2 py-0.5 text-xs"
          disabled={loading || !nodes.length}
          onClick={handleRun}
          type="button"
        >
          {loading ? "Simulating..." : "Run Simulation"}
        </button>
      </div>

      {!result && (
        <div className="text-gray-500">
          Build a workflow and click &quot;Run Simulation&quot; to see the
          execution log and validation errors.
        </div>
      )}

      {result && (
        <div>
          {result.errors.length > 0 && (
            <div className="mb-2">
              <div className="font-semibold text-red-600 mb-1">Errors</div>
              <ul className="list-disc pl-4">
                {result.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="font-semibold mb-1">Execution log</div>
            {result.steps.length === 0 ? (
              <div className="text-gray-500">No steps executed.</div>
            ) : (
              <ol className="list-decimal pl-4">
                {result.steps.map((s, i) => (
                  <li key={i}>{s.message}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
