import { useWorkflowStore } from "../hooks/useWorkflowStore";
import type { WorkflowNodeData } from "../nodes/types";
import StartNodeForm from "../nodes/forms/StartNodeForm";
import TaskNodeForm from "../nodes/forms/TaskNodeForm.tsx";
import ApprovalNodeForm from "../nodes/forms/ApprovalNodeForm.tsx";
import AutomatedStepNodeForm from "../nodes/forms/AutomatedStepNodeForm.tsx";
import EndNodeForm from "../nodes/forms/EndNodeForm";

export default function NodeDetailsPanel() {
  const { nodes, selectedNodeId, updateNodeData } = useWorkflowStore(
    (s) => ({
      nodes: s.nodes,
      selectedNodeId: s.selectedNodeId,
      updateNodeData: s.updateNodeData,
    })
  );

  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node) {
    return (
      <div className="w-64 border-l p-3 text-xs text-gray-500">
        Select a node to edit its configuration.
      </div>
    );
  }

  const data = node.data as WorkflowNodeData;
  const onChange = (partial: Partial<WorkflowNodeData>) =>
    updateNodeData(node.id, partial);

  return (
    <div className="w-64 border-l p-3 text-xs overflow-y-auto">
      {data.type === "start" && (
        <StartNodeForm data={data} onChange={onChange} />
      )}
      {data.type === "task" && <TaskNodeForm data={data} onChange={onChange} />}
      {data.type === "approval" && (
        <ApprovalNodeForm data={data} onChange={onChange} />
      )}
      {data.type === "automated" && (
        <AutomatedStepNodeForm data={data} onChange={onChange} />
      )}
      {data.type === "end" && <EndNodeForm data={data} onChange={onChange} />}
    </div>
  );
}
