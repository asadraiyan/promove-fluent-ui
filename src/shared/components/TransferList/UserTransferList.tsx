import React, { useState } from "react";
import { UserTransferListView } from "./UserTransferListView";
import type {
  ActiveSelection,
  ListSide,
  TransferUser,
} from "./UserTransferListView";

const initialAvailableUsers: TransferUser[] = [
  { id: "IN-001", name: "Anil Patel" },
  { id: "IN-002", name: "Asad Raiyan" },
  { id: "IN-003", name: "Arpit Singh" },
  { id: "IN-004", name: "Syed Ali" },
  { id: "IN-005", name: "Shubham Singh" },
  { id: "IN-006", name: "John Doe" },
];

const reorderUser = (
  users: TransferUser[],
  userId: string,
  offset: -1 | 1,
): TransferUser[] => {
  const currentIndex = users.findIndex((user) => user.id === userId);
  const nextIndex = currentIndex + offset;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= users.length) {
    return users;
  }

  const reordered = [...users];
  [reordered[currentIndex], reordered[nextIndex]] = [
    reordered[nextIndex],
    reordered[currentIndex],
  ];
  return reordered;
};

export const UserTransferList: React.FC = () => {
  const [availableUsers, setAvailableUsers] = useState(initialAvailableUsers);
  const [selectedUsers, setSelectedUsers] = useState<TransferUser[]>([]);
  const [activeSelection, setActiveSelection] =
    useState<ActiveSelection | null>(null);

  const activeUsers =
    activeSelection?.side === "available" ? availableUsers : selectedUsers;
  const activeIndex = activeSelection
    ? activeUsers.findIndex((user) => user.id === activeSelection.userId)
    : -1;

  const moveSelectedUser = (target: ListSide) => {
    if (!activeSelection || activeSelection.side === target) return;

    const sourceUsers =
      activeSelection.side === "available" ? availableUsers : selectedUsers;
    const user = sourceUsers.find(
      (candidate) => candidate.id === activeSelection.userId,
    );
    if (!user) return;

    if (activeSelection.side === "available") {
      setAvailableUsers((users) => users.filter((item) => item.id !== user.id));
      setSelectedUsers((users) => [...users, user]);
    } else {
      setSelectedUsers((users) => users.filter((item) => item.id !== user.id));
      setAvailableUsers((users) => [...users, user]);
    }
    setActiveSelection({ side: target, userId: user.id });
  };

  const moveAllUsers = (target: ListSide) => {
    if (target === "selected") {
      setSelectedUsers((users) => [...users, ...availableUsers]);
      setAvailableUsers([]);
    } else {
      setAvailableUsers((users) => [...users, ...selectedUsers]);
      setSelectedUsers([]);
    }
    setActiveSelection(null);
  };

  const moveActiveUser = (offset: -1 | 1) => {
    if (!activeSelection) return;

    if (activeSelection.side === "available") {
      setAvailableUsers((users) =>
        reorderUser(users, activeSelection.userId, offset),
      );
    } else {
      setSelectedUsers((users) =>
        reorderUser(users, activeSelection.userId, offset),
      );
    }
  };

  return (
    <UserTransferListView
      availableUsers={availableUsers}
      selectedUsers={selectedUsers}
      activeSelection={activeSelection}
      activeIndex={activeIndex}
      onSelect={setActiveSelection}
      onMoveSelected={moveSelectedUser}
      onMoveAll={moveAllUsers}
      onMoveActive={moveActiveUser}
    />
  );
};
