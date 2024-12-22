import { webRoutes } from '@/routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import Icon, { UserOutlined, InfoCircleOutlined, TeamOutlined, ApartmentOutlined, FileDoneOutlined, BuildOutlined, CalendarOutlined } from '@ant-design/icons';

export const sidebar = [
    {
        path: webRoutes.dashboard,
        key: webRoutes.dashboard,
        name: 'Bảng điều khiển',
        icon: <Icon component={BiHomeAlt2} />,
    },
    {
        path: webRoutes.users,
        key: webRoutes.users,
        name: 'Người dùng',
        icon: <UserOutlined />,
    },
    {
        path: webRoutes.children,
        key: webRoutes.children,
        name: 'Trẻ em',
        icon: <TeamOutlined />,
    },
    {
        path: webRoutes.campuses,
        key: webRoutes.campuses,
        name: 'Trường học',
        icon: <ApartmentOutlined />,
    },
    {
        path: webRoutes.rooms,
        key: webRoutes.rooms,
        name: 'Phòng',
        icon: <BuildOutlined />,
    },
    {
        path: webRoutes.bookings,
        key: webRoutes.bookings,
        name: 'Đặt phòng',
        icon: <CalendarOutlined />,
    },
    {
        path: webRoutes.signs,
        key: webRoutes.signs,
        name: 'Ký vào/ra',
        icon: <FileDoneOutlined />,
    }
];
