import type { ApprovalNodeData } from "../types";

type Props = {
  data: ApprovalNodeData;
  onChange: (data: Partial<ApprovalNodeData>) => void;
};

export default function ApprovalNodeForm({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Approval Node</h3>

      <label className="block text-xs mb-1">Title</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.label}
        onChange={(e) => onChange({ label: e.target.value })}
      />

      <label className="block text-xs mb-1">Approver role</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        placeholder="Manager / HRBP / Director"
        value={data.approverRole}
        onChange={(e) => onChange({ approverRole: e.target.value })}
      />

      <label className="block text-xs mb-1">Auto-approve threshold</label>
      <input
        type="number"
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.autoApproveThreshold}
        onChange={(e) =>
          onChange({ autoApproveThreshold: Number(e.target.value) })
        }
      />
    </div>
  );
}
