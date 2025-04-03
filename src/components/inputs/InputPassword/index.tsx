import { memo, useState } from "react";
import * as motion from "motion/react-client";

import InputBaseIcon, { IInputBaseIcon } from "../InputBaseIcon";
import { Eye, EyeHide } from "@assets/icons";

export interface IInputPassword extends Omit<IInputBaseIcon, "children"> {}

function InputPassword({ ...props }: IInputPassword) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputBaseIcon type={showPassword ? "text" : "password"} {...props}>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setShowPassword((c) => !c)}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          {showPassword ? <EyeHide width={25} /> : <Eye width={25} />}
        </motion.div>
      </div>
    </InputBaseIcon>
  );
}

export default memo(InputPassword);
