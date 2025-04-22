import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export default function AppLayout() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1 }} className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}
