import * as fos from "@fiftyone/state";
import { Autorenew } from "@mui/icons-material";
import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "../../utils";

const ShuffleColor: React.FC = () => {
  const [colorSeed, setColorSeed] = useRecoilState(fos.colorSeed(false));
  return (
    <Button
      text={
        <span style={{ display: "flex", justifyContent: "center" }}>
          Shuffle all field colors{" "}
          <Autorenew
            style={{
              marginLeft: "0.25rem",
              color: "inherit",
            }}
          />
        </span>
      }
      title={"Shuffle field colors"}
      onClick={() => setColorSeed(colorSeed + 1)}
      style={{
        margin: "0.25rem -0.5rem",
        height: "2rem",
        textAlign: "center",
        flex: 1,
        width: "200px",
      }}
    />
  );
};

export default ShuffleColor;
