import React, { useState } from "react";
import { Tab, TabList, makeStyles } from "@fluentui/react-components";

type TabItem = {
  value: string;
  label: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  isBorder?: boolean;
};

const useStyles = makeStyles({
  tabList: {
    marginBottom: "16px",
    display: "flex",
    flexWrap: "wrap",
  },
  tab: {
    minWidth: "100px",
    maxWidth: "100%",
    whiteSpace: "normal",
    textAlign: "center",
  },
  tabContent: {
    padding: "16px",
    borderRadius: "4px",
    width: "100%",
  },
});

export const Tabs = ({
  items,
  children,
  defaultValue,
  value,
  onChange,
  isBorder = false,
}: TabsProps): React.ReactElement => {
  const styles = useStyles();

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value ?? "",
  );

  const selectedValue = value ?? internalValue;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <>
      <TabList
        className={styles.tabList}
        selectedValue={selectedValue}
        onTabSelect={(_, data) => handleChange(String(data.value))}
      >
        {items.map((item) => (
          <Tab key={item.value} value={item.value} className={styles.tab}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      <div
        className={styles.tabContent}
        style={{ border: isBorder ? "1px solid #ccc" : "none" }}
      >
        {children}
      </div>
    </>
  );
};

export type { TabItem, TabsProps };
export default Tabs;
