import type{ EndNodeData } from "../types";

type Props = {
  data: EndNodeData;
  onChange: (data: Partial<EndNodeData>) => void;
};

export default function EndNodeForm({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="font-semibold mb-2">End Node</h3>

      <label className="block text-xs mb-1">End message</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.message}
        onChange={(e) => onChange({ message: e.target.value })}
      />

      <label className="inline-flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={data.showSummary}
          onChange={(e) => onChange({ showSummary: e.target.checked })}
        />
        Show workflow summary
      </label>
    </div>
  );
}
