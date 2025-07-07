import { useEffect, useState } from 'react';

import ModalTitle from '@components/modals/ModalTitle';
import style from './style.module.css';
import Title from '@components/texts/Title';
import EditProfileForm, {
  IEditProfileFormFields,
} from '@components/forms/EditProfileForm';
import { IUser } from '@interfaces/user/user';
import { getUserById } from '@services/index';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import Card from '@components/cards/Card';
import InputBase from '@components/inputs/InputBase';
import TextButton from '@components/buttons/TextButton';

export interface IEditProfileModalState {
  open: boolean;
  user: IEditProfileFormFields;
}

const defaultProfile: IEditProfileFormFields = {
  id: 0,
  name: '',
  email: '',
};

export default function Profile() {
  const { user: userZustand } = useGlobalStore();

  const [openEditProfileModal, setOpenEditProfileModal] =
    useState<IEditProfileModalState>({ open: false, user: defaultProfile });
  const [user, setUser] = useState<Pick<
    IUser,
    'id_usuario' | 'email' | 'nome'
  > | null>(null);

  //= =================================================================================
  useEffect(() => {
    (async () => {
      if (userZustand) {
        const res = await getUserById(userZustand?.id_usuario);
        if (res)
          setUser({
            id_usuario: res.id_usuario,
            email: res.email,
            nome: res.nome,
          });
      }
    })();
  }, [userZustand]);

  //= =================================================================================
  function handleEditProfile(
    editedUser: Pick<IUser, 'id_usuario' | 'email' | 'nome'>,
  ) {
    setUser((currentUser) => ({ ...currentUser, ...editedUser }));
  }

  //= =================================================================================
  return (
    <>
      {/* ----- Edit Profile Modal ----- */}
      <ModalTitle
        title='Editar perfil'
        onClose={() =>
          setOpenEditProfileModal({ open: false, user: defaultProfile })
        }
        isVisible={openEditProfileModal.open}
      >
        <EditProfileForm
          onCloseForm={() =>
            setOpenEditProfileModal({ open: false, user: defaultProfile })
          }
          onEditProfile={(editedUser) => handleEditProfile(editedUser)}
          user={openEditProfileModal.user}
        />
      </ModalTitle>

      {/* ----- Screen ----- */}
      <div className={style.container}>
        <Title title='Perfil' />

        <div className={style.cardContainer}>
          <Card cardType='tertiary' width='40%'>
            <div className={style.inputWrapper}>
              <InputBase
                text='Identificador'
                placeholder='ID'
                value={user?.id_usuario.toString() || ''}
                disabled
              />
              <InputBase
                text='Nome'
                placeholder='Nome'
                value={user?.nome}
                disabled
              />
              <InputBase
                text='Email'
                placeholder='Email'
                value={user?.email}
                disabled
              />

              <TextButton
                text='Editar perfil'
                onClick={() =>
                  user &&
                  setOpenEditProfileModal({
                    open: true,
                    user: {
                      id: user.id_usuario,
                      name: user.nome,
                      email: user.email,
                    },
                  })
                }
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
