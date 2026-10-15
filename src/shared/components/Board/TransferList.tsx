import React, { useState, useMemo } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Text,
  mergeClasses,
} from "@fluentui/react-components";
import {
  ChevronRightRegular,
  ChevronLeftRegular,
  ChevronDoubleRightRegular,
  ChevronDoubleLeftRegular,
  ArrowUpRegular,
  ArrowDownRegular,
} from "@fluentui/react-icons";

// Generic interface for maximum reusability
export interface TransferListProps<T> {
  leftItems: T[];
  rightItems: T[];
  onChange: (left: T[], right: T[]) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  leftTitle?: string;
  rightTitle?: string;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    maxWidth: "800px",
  },
  boxWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  listContainer: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    height: "250px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: tokens.spacingVerticalXS,
  },
  listItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    userSelect: "none",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  listItemSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  controlsColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: tokens.spacingVerticalS,
  },
});

export const TransferList = <T extends Record<string, any> | string>({
  leftItems,
  rightItems,
  onChange,
  getKey,
  getLabel,
  leftTitle = "Available Items",
  rightTitle = "Selected Items",
}: TransferListProps<T>) => {
  const styles = useStyles();

  // Local state tracks ONLY what is currently highlighted
  const [selectedLeft, setSelectedLeft] = useState<Set<string>>(new Set());
  const [selectedRight, setSelectedRight] = useState<Set<string>>(new Set());

  // --- ITEM TOGGLING ---
  const toggleSelection = (key: string, side: "left" | "right") => {
    const targetSet = side === "left" ? selectedLeft : selectedRight;
    const setter = side === "left" ? setSelectedLeft : setSelectedRight;

    const newSet = new Set(targetSet);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setter(newSet);
  };

  // --- TRANSFER LOGIC ---
  const moveRight = () => {
    const itemsToMove = leftItems.filter((item) =>
      selectedLeft.has(getKey(item)),
    );
    const remainingLeft = leftItems.filter(
      (item) => !selectedLeft.has(getKey(item)),
    );

    onChange(remainingLeft, [...rightItems, ...itemsToMove]);
    setSelectedLeft(new Set()); // Clear selection after move
  };

  const moveLeft = () => {
    const itemsToMove = rightItems.filter((item) =>
      selectedRight.has(getKey(item)),
    );
    const remainingRight = rightItems.filter(
      (item) => !selectedRight.has(getKey(item)),
    );

    onChange([...leftItems, ...itemsToMove], remainingRight);
    setSelectedRight(new Set());
  };

  const moveAllRight = () => {
    onChange([], [...rightItems, ...leftItems]);
    setSelectedLeft(new Set());
  };

  const moveAllLeft = () => {
    onChange([...leftItems, ...rightItems], []);
    setSelectedRight(new Set());
  };

  // --- REORDER LOGIC (Enterprise Block-Shift Algorithm) ---
  const moveUp = () => {
    // Determine which box is active. Block action if both have selections to prevent UX confusion.
    if (selectedLeft.size > 0 && selectedRight.size > 0) return;

    const isLeft = selectedLeft.size > 0;
    const items = isLeft ? [...leftItems] : [...rightItems];
    const selection = isLeft ? selectedLeft : selectedRight;

    for (let i = 1; i < items.length; i++) {
      if (
        selection.has(getKey(items[i])) &&
        !selection.has(getKey(items[i - 1]))
      ) {
        // Swap
        [items[i], items[i - 1]] = [items[i - 1], items[i]];
      }
    }

    isLeft ? onChange(items, rightItems) : onChange(leftItems, items);
  };

  const moveDown = () => {
    if (selectedLeft.size > 0 && selectedRight.size > 0) return;

    const isLeft = selectedLeft.size > 0;
    const items = isLeft ? [...leftItems] : [...rightItems];
    const selection = isLeft ? selectedLeft : selectedRight;

    for (let i = items.length - 2; i >= 0; i--) {
      if (
        selection.has(getKey(items[i])) &&
        !selection.has(getKey(items[i + 1]))
      ) {
        // Swap
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
      }
    }

    isLeft ? onChange(items, rightItems) : onChange(leftItems, items);
  };

  // --- VALIDATION COMPUTATIONS ---
  const disableUp = useMemo(() => {
    if (selectedLeft.size > 0 && selectedRight.size > 0) return true; // Conflicting selections
    if (selectedLeft.size === 0 && selectedRight.size === 0) return true;

    const activeItems = selectedLeft.size > 0 ? leftItems : rightItems;
    const activeSelection =
      selectedLeft.size > 0 ? selectedLeft : selectedRight;
    // Disabled if the very first item is selected (can't move up)
    return (
      activeItems.length > 0 && activeSelection.has(getKey(activeItems[0]))
    );
  }, [leftItems, rightItems, selectedLeft, selectedRight, getKey]);

  const disableDown = useMemo(() => {
    if (selectedLeft.size > 0 && selectedRight.size > 0) return true;
    if (selectedLeft.size === 0 && selectedRight.size === 0) return true;

    const activeItems = selectedLeft.size > 0 ? leftItems : rightItems;
    const activeSelection =
      selectedLeft.size > 0 ? selectedLeft : selectedRight;
    // Disabled if the very last item is selected
    return (
      activeItems.length > 0 &&
      activeSelection.has(getKey(activeItems[activeItems.length - 1]))
    );
  }, [leftItems, rightItems, selectedLeft, selectedRight, getKey]);

  return (
    <div className={styles.container}>
      {/* LEFT BOX */}
      <div className={styles.boxWrapper}>
        <Text weight="semibold">{leftTitle}</Text>
        <div
          className={styles.listContainer}
          role="listbox"
          aria-multiselectable="true"
        >
          {leftItems.map((item) => {
            const key = getKey(item);
            const isSelected = selectedLeft.has(key);
            return (
              <div
                key={key}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleSelection(key, "left")}
                className={mergeClasses(
                  styles.listItem,
                  isSelected && styles.listItemSelected,
                )}
              >
                {getLabel(item)}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTROLS */}
      <div className={styles.controlsColumn}>
        <Button
          icon={<ChevronRightRegular />}
          onClick={moveRight}
          disabled={selectedLeft.size === 0}
          aria-label="Move selected right"
        />
        <Button
          icon={<ChevronLeftRegular />}
          onClick={moveLeft}
          disabled={selectedRight.size === 0}
          aria-label="Move selected left"
        />
        <Button
          icon={<ChevronDoubleRightRegular />}
          onClick={moveAllRight}
          disabled={leftItems.length === 0}
          aria-label="Move all right"
        />
        <Button
          icon={<ChevronDoubleLeftRegular />}
          onClick={moveAllLeft}
          disabled={rightItems.length === 0}
          aria-label="Move all left"
        />
        <div style={{ height: tokens.spacingVerticalS }} /> {/* Spacer */}
        <Button
          icon={<ArrowUpRegular />}
          onClick={moveUp}
          disabled={disableUp}
          aria-label="Move selected up"
        />
        <Button
          icon={<ArrowDownRegular />}
          onClick={moveDown}
          disabled={disableDown}
          aria-label="Move selected down"
        />
      </div>

      {/* RIGHT BOX */}
      <div className={styles.boxWrapper}>
        <Text weight="semibold">{rightTitle}</Text>
        <div
          className={styles.listContainer}
          role="listbox"
          aria-multiselectable="true"
        >
          {rightItems.map((item) => {
            const key = getKey(item);
            const isSelected = selectedRight.has(key);
            return (
              <div
                key={key}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleSelection(key, "right")}
                className={mergeClasses(
                  styles.listItem,
                  isSelected && styles.listItemSelected,
                )}
              >
                {getLabel(item)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
