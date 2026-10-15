import React, { useState } from "react";
import { TransferList } from "./TransferList";
import { makeStyles, tokens } from "@fluentui/react-components";

// Define your task model
interface Task {
  id: string;
  title: string;
}

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Configure Docker containers" },
  { id: "t2", title: "Setup Kubernetes deployment files" },
  { id: "t3", title: "Migrate internal CS-Utility to React" },
  { id: "t4", title: "Optimize WordPress animations" },
  { id: "t5", title: "Implement Fluent UI v9 DataGrid" },
];

const useStyles = makeStyles({
  layout: {
    padding: tokens.spacingVerticalXXL,
    maxWidth: "1000px",
    margin: "0 auto",
  },
});

export const TaskDashboard: React.FC = () => {
  const styles = useStyles();

  // The parent component owns the definitive state of the lists
  const [unassignedTasks, setUnassignedTasks] = useState<Task[]>(INITIAL_TASKS);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  return (
    <div className={styles.layout}>
      <h2 style={{ fontFamily: "Segoe UI", marginBottom: "16px" }}>
        Task Assignment
      </h2>

      <TransferList<Task>
        leftItems={unassignedTasks}
        rightItems={assignedTasks}
        // Bulk update state when the TransferList fires a change
        onChange={(newLeft, newRight) => {
          setUnassignedTasks(newLeft);
          setAssignedTasks(newRight);
        }}
        // Tell the reusable component how to read your complex objects
        getKey={(task) => task.id}
        getLabel={(task) => task.title}
        leftTitle="Pending Tasks"
        rightTitle="Sprint Backlog"
      />
    </div>
  );
};
