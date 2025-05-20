import CardMenu from '@components/cards/CardMenu';
import style from './style.module.css';

import Paragraph from '@components/texts/Paragraph';
import { useIsAdmin } from '@hooks/useAuth';
import { Colors } from '@styles/Colors';
import { Logout, Users, Wrench, Car } from '@assets/icons';
import { useLocation, useNavigate } from 'react-router';
import React, { ReactNode } from 'react';
import Button from '@components/buttons/Button';
import useOnLogout from '@hooks/useOnLogout';

export default function Sidebar() {
  const isAdmin = useIsAdmin();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleLogout = useOnLogout();

  interface IRoute {
    route: string;
    icon: ReactNode;
    title: string;
    onClick: VoidFunction;
    needAdmin?: boolean;
  }

  const routes: Array<IRoute> = [
    {
      route: 'users',
      icon: (
        <Users
          width={16}
          height={16}
          fill={location.includes('users') ? Colors.white : Colors.shape}
        />
      ),
      title: 'Usuários',
      onClick: () => navigate('/app/users'),
      needAdmin: true,
    },
    {
      route: 'home',
      icon: (
        <Wrench
          width={16}
          height={16}
          fill={location.includes('home') ? Colors.white : Colors.shape}
        />
      ),
      title: 'Home',
      onClick: () => navigate('/app/home'),
    },
    {
      route: 'vehicles',
      icon: (
        <Car
          width={16}
          height={16}
          fill={location.includes('vehicles') ? Colors.white : Colors.shape}
        />
      ),
      title: 'Veículos',
      onClick: () => navigate('/app/vehicles'),
    },
  ];

  function renderItems() {
    return routes.map((card, index) => {
      const { icon, onClick, route, title, needAdmin } = card;

      if (needAdmin && !isAdmin) return null;

      return (
        <React.Fragment key={`CardMenu-${index}`}>
          {index % 2 === 0 && (
            <hr key={`Separator1-${index}`} className={style.separator} />
          )}
          <CardMenu
            key={`CardMenuItem-${index}`}
            isSelected={location.includes(route)}
            icon={icon}
            title={title}
            onClick={onClick}
          />
          {index % 2 === 0 && (
            <hr key={`Separator2-${index}`} className={style.separator} />
          )}
        </React.Fragment>
      );
    });
  }

  return (
    <nav
      className={style.container}
      style={{ backgroundColor: Colors.shape, gap: '4rem' }}
    >
      <Paragraph text='UTI do Carro' weight='medium' size='medium' />
      <div className={style.menu}>{renderItems()}</div>
      <Button cardType='transparent' onClick={handleLogout}>
        <Logout width={24} height={24} stroke={Colors.error} />
        <Paragraph text='Sair' />
      </Button>
    </nav>
  );
}
