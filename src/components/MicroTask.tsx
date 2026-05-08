import type { MicroTask } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

interface MicroTaskProps {
  task: MicroTask;
  handleUpdate: (updatedTask: MicroTask) => void;
}

export default function MicroTask({ task, handleUpdate }: MicroTaskProps) {
  return (
    <div className="flex items-center border gap-2 p-4 rounded mb-2 w-64">
      <Checkbox
        checked={task.isCompleted}
        onCheckedChange={() =>
          handleUpdate({ ...task, isCompleted: !task.isCompleted })
        }
      />
      <p>{task.title}</p>
    </div>
  );
}
