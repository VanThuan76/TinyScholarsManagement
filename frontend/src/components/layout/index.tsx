import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web';
import { Dropdown } from 'antd';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/adminSlice';
import { memo } from 'react';
import { sidebar } from '@/components/layout/sidebar';
import { apiRoutes } from '@/routes/api';
import http from '@/lib/http';
import { handleErrorResponse } from '@/lib/utils';
import { RiShieldUserFill } from 'react-icons/ri';
import { RootState } from '@/store';

const LayoutAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admin = useSelector((state: RootState) => state.admin);

    const defaultProps: ProLayoutProps = {
        title: CONFIG.appName,
        pageTitleRender(props, defaultPageTitle) {
            return `${defaultPageTitle} - ${CONFIG.appName}`;
        },
        logo: '/icon.png',
        fixedHeader: true,
        fixSiderbar: true,
        layout: CONFIG.theme.sidebarLayout,
        route: {
            routes: sidebar,
        },
    };

    const logoutAdmin = () => {
        dispatch(logout());
        navigate(webRoutes.login, {
            replace: true,
        });

        http.post(apiRoutes.logout).catch((error) => {
            handleErrorResponse(error);
        });
    };

    return (
        <div className="h-screen">
            <ProLayout
                {...defaultProps}
                token={{
                    sider: {
                        colorMenuBackground: 'white',
                    },
                }}
                location={location}
                onMenuHeaderClick={() => navigate(webRoutes.dashboard)}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            item.path && navigate(item.path);
                        }}
                        href={item.path}
                    >
                        {dom}
                    </a>
                )}
                avatarProps={{
                    icon: <Icon component={RiShieldUserFill} />,
                    className:
                        'bg-rfprimary bg-opacity-20 text-rfprimary text-opacity-90',
                    size: 'small',
                    shape: 'square',
                    title: `${admin?.lastName || "Ẩn danh"}`,
                    render: (_, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: 'Đăng xuất',
                                            onClick: () => {
                                                logoutAdmin();
                                            },
                                        },
                                    ],
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
            >
                <Outlet />
            </ProLayout>
        </div>
    );
};

export default memo(LayoutAdmin);
