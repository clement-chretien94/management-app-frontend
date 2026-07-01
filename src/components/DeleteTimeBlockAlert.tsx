import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTimeBlock } from "@/services/timeblock";

interface DeleteTimeBlockAlertProps {
  title: string;
  id: string;
  onDelete: () => void;
}

export default function DeleteTimeBlockAlert({
  title,
  id,
  onDelete,
}: Readonly<DeleteTimeBlockAlertProps>) {
  const handleDelete = async () => {
    try {
      await deleteTimeBlock(id);
      onDelete();
    } catch (error) {
      console.error("Error deleting time block:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Time Block</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the time block "{title}"? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
