import { NotFound404 } from '@assets/svgs';
import PressableText from '@components/buttons/PressableText';
import { useNavigate } from 'react-router';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NotFound404 />
      <h1 style={{ color: 'white' }}> Página não encontrada!</h1>
      <PressableText text='Voltar' onClick={() => navigate('/app/home')} />
    </div>
  );
}
