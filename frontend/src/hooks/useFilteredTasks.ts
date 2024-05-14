import { useEffect, useState } from "react";
import { Task } from "../types/Task";

const useFilteredTasks = (tasks: Task[], selectedTags: string[]) => {
  const [filteredCompletedTasks, setFilteredCompletedTasks] = useState<Task[]>(
    []
  );
  const [filteredNotCompletedTasks, setFilteredNotCompletedTasks] = useState<
    Task[]
  >([]);

  useEffect(() => {
    const filterTasksByTags = (taskList: Task[]) => {
      return selectedTags.length > 0
        ? taskList.filter((task) =>
            task.tags.some((tag) => selectedTags.includes(tag.name))
          )
        : taskList;
    };

    setFilteredCompletedTasks(
      filterTasksByTags(tasks.filter((task) => task.completed))
    );
    setFilteredNotCompletedTasks(
      filterTasksByTags(tasks.filter((task) => !task.completed))
    );
  }, [tasks, selectedTags]);

  return { filteredCompletedTasks, filteredNotCompletedTasks };
};

export default useFilteredTasks;
