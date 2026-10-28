import { makeStyles, tokens } from "@fluentui/react-components";

export const useShipmentContentStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "@media (max-width: 560px)": {
      width: "calc(100% - 16px)",
      margin: "12px auto",
      padding: tokens.spacingVerticalS,
    },
  },
  heading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  moveGrid: {
    marginTop: tokens.spacingVerticalM,
  },
  detailHeading: {
    margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalS}`,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  details: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 1fr)",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  detailColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  selectionRow: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 0.8fr) minmax(0, 1.2fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  checkbox: {
    minWidth: 0,
  },
  inlineFields: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 0.7fr)",
    columnGap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  mileageRow: {
    display: "grid",
    gridTemplateColumns: "auto minmax(70px, 1fr) auto auto",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "auto minmax(56px, 1fr) auto auto",
      columnGap: tokens.spacingHorizontalXS,
    },
  },
  field: {
    minWidth: 0,
    "& input": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },
  contentTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  contentLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 0.8fr)",
    alignItems: "start",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(110px, 1fr) repeat(2, minmax(70px, 0.7fr))",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(90px, 1fr) repeat(2, minmax(0, 0.7fr))",
      columnGap: tokens.spacingHorizontalXS,
      rowGap: tokens.spacingVerticalXS,
    },
  },
  tridentActions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  columnTitle: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  contentLabel: {
    color: tokens.colorNeutralForeground1,
  },
  interfaceHeader: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  interfaceGrid: {
    display: "grid",
    gridTemplateColumns: "auto repeat(2, minmax(70px, 0.6fr))",
    alignItems: "end",
    gap: tokens.spacingVerticalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  interfaceActions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    gridRow: "1 / span 3",
    "@media (max-width: 560px)": {
      gridRow: "auto",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > button": {
        flex: "1 1 120px",
      },
    },
  },
  interfaceFinalRow: {
    gridRow: 3,
    "@media (max-width: 560px)": {
      gridRow: "auto",
    },
  },
  interfaceInput: {
    minWidth: 0,
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  quantityRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    marginTop: tokens.spacingVerticalM,
  },
  quantity: {
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
});
