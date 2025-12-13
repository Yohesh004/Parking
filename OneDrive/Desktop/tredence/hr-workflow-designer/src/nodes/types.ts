export type NodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface BaseNodeData {
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  metadata: { key: string; value: string }[];
}

export interface TaskNodeData extends BaseNodeData {
  description: string;
  assignee: string;
  dueDate: string;
  customFields: { key: string; value: string }[];
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  actionId: string;
  params: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  message: string;
  showSummary: boolean;
}

export type WorkflowNodeData =
  | (StartNodeData & { type: "start" })
  | (TaskNodeData & { type: "task" })
  | (ApprovalNodeData & { type: "approval" })
  | (AutomatedNodeData & { type: "automated" })
  | (EndNodeData & { type: "end" });
