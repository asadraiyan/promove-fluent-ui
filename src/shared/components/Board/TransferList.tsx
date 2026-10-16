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

  const [selectedLeft, setSelectedLeft] = useState<Set<string>>(new Set());
  const [selectedRight, setSelectedRight] = useState<Set<string>>(new Set());

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

  const moveRight = () => {
    const itemsToMove = leftItems.filter((item) =>
      selectedLeft.has(getKey(item)),
    );
    const remainingLeft = leftItems.filter(
      (item) => !selectedLeft.has(getKey(item)),
    );
    onChange(remainingLeft, [...rightItems, ...itemsToMove]);
    setSelectedLeft(new Set());
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

  const shiftUp = (items: T[], selection: Set<string>) => {
    if (selection.size === 0) return items;
    const newItems = [...items];
    for (let i = 1; i < newItems.length; i++) {
      if (
        selection.has(getKey(newItems[i])) &&
        !selection.has(getKey(newItems[i - 1]))
      ) {
        [newItems[i], newItems[i - 1]] = [newItems[i - 1], newItems[i]];
      }
    }
    return newItems;
  };

  const shiftDown = (items: T[], selection: Set<string>) => {
    if (selection.size === 0) return items;
    const newItems = [...items];
    for (let i = newItems.length - 2; i >= 0; i--) {
      if (
        selection.has(getKey(newItems[i])) &&
        !selection.has(getKey(newItems[i + 1]))
      ) {
        [newItems[i], newItems[i + 1]] = [newItems[i + 1], newItems[i]];
      }
    }
    return newItems;
  };

  const moveUp = () => {
    onChange(
      shiftUp(leftItems, selectedLeft),
      shiftUp(rightItems, selectedRight),
    );
  };

  const moveDown = () => {
    onChange(
      shiftDown(leftItems, selectedLeft),
      shiftDown(rightItems, selectedRight),
    );
  };

  const disableUp = useMemo(() => {
    if (selectedLeft.size === 0 && selectedRight.size === 0) return true;

    const leftStuck =
      selectedLeft.size > 0 && selectedLeft.has(getKey(leftItems[0]));
    const rightStuck =
      selectedRight.size > 0 && selectedRight.has(getKey(rightItems[0]));

    const leftCanMove = selectedLeft.size > 0 && !leftStuck;
    const rightCanMove = selectedRight.size > 0 && !rightStuck;

    return !(leftCanMove || rightCanMove);
  }, [leftItems, rightItems, selectedLeft, selectedRight, getKey]);

  const disableDown = useMemo(() => {
    if (selectedLeft.size === 0 && selectedRight.size === 0) return true;

    const leftStuck =
      selectedLeft.size > 0 &&
      selectedLeft.has(getKey(leftItems[leftItems.length - 1]));
    const rightStuck =
      selectedRight.size > 0 &&
      selectedRight.has(getKey(rightItems[rightItems.length - 1]));

    const leftCanMove = selectedLeft.size > 0 && !leftStuck;
    const rightCanMove = selectedRight.size > 0 && !rightStuck;

    return !(leftCanMove || rightCanMove);
  }, [leftItems, rightItems, selectedLeft, selectedRight, getKey]);

  return (
    <div className={styles.container}>
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
        <div style={{ height: tokens.spacingVerticalS }} />
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
