import React from "react";
import { useTheme, useToogleTheme } from "../contexts/theme-context";
import { Button } from "antd";
function theme() {
  const theme = useTheme();
  const toggleTheme = useToogleTheme();
  return (
    <>
      <div
        style={{
          width: "350px",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme.black,
          border: "2px solid black",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: theme.white,
          }}
        >
          <h1 style={{ color: theme.black }}> Hello</h1>
        </div>
      </div>
      <Button onClick={() => toggleTheme()}>toggle theme</Button>
    </>
  );
}

export default theme;
