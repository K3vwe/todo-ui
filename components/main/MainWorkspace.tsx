"use client";

import { useEffect, useState } from "react";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import { Task, mockTasks } from "@/data/mockTasks";

export default function MainWorkspace() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? {
              ...updatedTask,
              startedAt: updatedTask.startedAt ?? new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditClick = (task: Task) => setEditingTask(task);
  const handleCloseModal = () => setEditingTask(null);

  const filteredTasks = tasks.filter(task =>
  task.title.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <WorkspaceHeader
        isScrolled={isScrolled}
        onAddTaskClick={() => setShowNewTaskModal(true)}
        onSearchChange={setSearchQuery}
      />


      {/* Add Task CTA */}
      {/* <div className="px-6 py-3">
        <button
          onClick={() => setShowNewTaskModal(true)}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          + Add Task
        </button>
      </div> */}

      <div
        onScroll={e => setIsScrolled(e.currentTarget.scrollTop > 0)}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onToggle={handleToggleTask}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
        />

      </div>

      <NewTaskModal 
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onAddTask={task => setTasks(prev => [task, ...prev])}
        nextId={(tasks.length + 1).toString()}
      />

      <EditTaskModal
        task={editingTask}
        onSave={handleEditTask} // updates task state
        onClose={handleCloseModal}
      />
    </main>
  );
}