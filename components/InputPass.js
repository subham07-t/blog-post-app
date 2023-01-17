import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const InputPass = ({ placeholder, handleChange, value }) => {
  const [type, setType] = useState("password");
  return (
    <div className="flex justify-between w-full outline-none border border-1 border-gray-400 rounded-md p-2">
      <input
        className="w-full outline-none"
        maxLength="16"
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />

      {type == "password" ? (
        <VisibilityOffIcon
          onClick={() => setType("text")}
          className="cursor-pointer"
        />
      ) : (
        <VisibilityIcon onClick={() => setType("password")} />
      )}
    </div>
  );
};

export default InputPass;
