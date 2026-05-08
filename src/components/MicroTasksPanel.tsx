import {
  getMicroTasks,
  createMicroTask,
  updateMicroTask,
} from "@/services/microtask";
import type { MicroTask } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import MicroTaskComponent from "@/components/MicroTask";
import { Plus } from "lucide-react";

export default function MicroTasksPanel() {
  const [microTasks, setMicroTasks] = useState<MicroTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddMicroTask = async (title: string) => {
    try {
      const newTask = await createMicroTask({ title });
      setMicroTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error creating micro task:", error);
    }
  };

  const handleMicroTaskUpdate = async (updatedTask: MicroTask) => {
    try {
      await updateMicroTask({
        id: updatedTask.id,
        task: {
          title: updatedTask.title,
          isCompleted: updatedTask.isCompleted,
        },
      });
      setMicroTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
    } catch (error) {
      console.error("Error updating micro task:", error);
    }
  };

  useEffect(() => {
    const fetchMicroTasks = async () => {
      try {
        const tasks = await getMicroTasks();
        setMicroTasks(tasks);
      } catch (error) {
        console.error("Error fetching micro tasks:", error);
      }
    };
    fetchMicroTasks();
  }, []);

  return (
    <Card className="p-4 w-1/5">
      <CardHeader>
        <CardTitle>2-Minutes Tasks</CardTitle>
        <div className="relative">
          <Input
            placeholder="Add a quick task..."
            className="pr-8"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <Plus
            width={20}
            height={20}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => handleAddMicroTask(newTaskTitle)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {microTasks.map((task) => (
          <MicroTaskComponent
            key={task.id}
            task={task}
            handleUpdate={handleMicroTaskUpdate}
          />
        ))}
      </CardContent>
    </Card>
  );
}
