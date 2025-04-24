import TextButton from "@components/buttons/TextButton";
import style from "./style.module.css";
import ModalTitle from "@components/modals/ModalTitle";
import { useState } from "react";

export default function Users() {
  const [addUserModal, setAddUserModal] = useState<boolean>(false);

  return (
    <div>
      <TextButton
        text="Adicionar usuário"
        onClick={() => setAddUserModal(true)}
      />
      <ModalTitle
        title="Adicionar usuário"
        onClose={() => setAddUserModal(false)}
        isVisible={addUserModal}
      />
    </div>
  );
}
