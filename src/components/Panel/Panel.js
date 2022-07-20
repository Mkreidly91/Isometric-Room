import React from "react";
import { TexturePicker } from "../TexturePicker/TexturePicker";

const Panel = (props) => {
    const {type,value,} = {props}
    return(
        <TexturePicker
        value={JSON.stringify(selectedTexture)}
        onChange={(event) => {
          const value = event.target.value;
          selectTexture(value);
        }}
    )
}