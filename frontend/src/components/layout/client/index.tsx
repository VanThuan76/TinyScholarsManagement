import { memo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import HeaderClient from './header';
import FooterClient from './footer';

const LayoutClient = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between">
            <HeaderClient />
            <Outlet />
            <FooterClient />
        </div>
    );
}

export default memo(LayoutClient);
