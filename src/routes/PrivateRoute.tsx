import { useAuth } from '@hooks/useAuth';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function PrivateRoute({ children }: PropsWithChildren) {
    const isLogged = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/login', { replace: true });
        }
    }, [isLogged, navigate]);

    return children;
}
