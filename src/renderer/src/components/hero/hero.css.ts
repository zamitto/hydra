import { style } from "@vanilla-extract/css";
import { SPACING_UNIT, vars } from "../../theme.css";

export const hero = style({
  width: "100%",
  height: "280px",
  minHeight: "280px",
  maxHeight: "280px",
  borderRadius: "8px",
  color: "#DADBE1",
  overflow: "hidden",
  boxShadow: "0px 0px 15px 0px #000000",
  cursor: "pointer",
  border: `solid 1px ${vars.color.borderColor}`,
  zIndex: "1",
  "@media": {
    "(min-width: 1250px)": {
      backgroundPosition: "center",
    },
  },
});

export const heroMedia = style({
  objectFit: "cover",
  objectPosition: "center",
  position: "absolute",
  zIndex: "-1",
  width: "100%",
  height: "100%",
  transition: "all ease 0.2s",
  selectors: {
    [`${hero}:hover &`]: {
      transform: "scale(1.02)",
    },
  },
});

export const backdrop = style({
  width: "100%",
  height: "100%",
  background: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 25%, transparent 100%)",
  position: "relative",
  display: "flex",
  overflow: "hidden",
});

export const description = style({
  maxWidth: "700px",
  fontSize: vars.size.bodyFontSize,
  color: "#c0c1c7",
  textAlign: "left",
  fontFamily: "'Fira Sans', sans-serif",
  lineHeight: "20px",
});

export const content = style({
  width: "100%",
  height: "100%",
  padding: `${SPACING_UNIT * 4}px ${SPACING_UNIT * 3}px`,
  gap: `${SPACING_UNIT * 2}px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});
