import { NotFound404 } from '@assets/svgs';

export default function PageNotFound() {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <NotFound404 />
            <h1 style={{ color: 'white' }}> Página não encontrada!</h1>
        </div>
    );
}
