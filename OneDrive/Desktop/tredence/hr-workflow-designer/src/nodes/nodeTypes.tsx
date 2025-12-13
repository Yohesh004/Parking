import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import "reactflow/dist/style.css";
import type { WorkflowNodeData } from "./types";

function BaseNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <div className="border rounded-md bg-white px-3 py-2 shadow-sm text-xs">
      <div className="font-semibold mb-1">{data.label || data.type}</div>
      <div className="text-[10px] text-gray-500 capitalize">{data.type} node</div>
    </div>
  );
}

export function StartNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <BaseNode {...props} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function TaskNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <BaseNode {...props} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function ApprovalNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <BaseNode {...props} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function AutomatedStepNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <BaseNode {...props} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function EndNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <BaseNode {...props} />
    </div>
  );
}

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};
