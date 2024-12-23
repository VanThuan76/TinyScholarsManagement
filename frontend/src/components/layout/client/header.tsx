import React, { useState, useEffect } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Dropdown, Menu } from "antd";
import { webRoutes } from "@/routes/web";
import { ClientState, logout } from "@/store/slices/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BookingForm from "@/components/forms/bookingForm";

const HeaderClient: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const client = useSelector((state: { client: ClientState }) => state.client);
    const location = useLocation();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleBookingDrawer = () => {
        setIsBookingDrawerOpen(!isBookingDrawerOpen);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const isActive = (path: string) => location.pathname === path;

    const menuDropdown = (
        <Menu>
            <Menu.Item key="profile">
                <a href={webRoutes.profile} className="text-gray-700 hover:text-blue-700">
                    Thông tin cá nhân
                </a>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );


    return (
        <header className="sticky top-0 left-0 w-full z-40 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6 overflow-hidden">
                <a href={webRoutes.home} className="flex items-center">
                    <img src="/logo.png" alt="Tham quan mầm non" className="absolute h-40" />
                </a>

                <div className="flex justify-end items-center gap-4">
                    {isMobile ? (
                        <Drawer
                            title="Trường Nouman"
                            placement="left"
                            onClose={toggleNav}
                            open={isNavOpen}
                        >
                            <ul className="space-y-2 list-none">
                                {[
                                    { label: "Trang Chủ", path: webRoutes.home },
                                    { label: "Về chúng tôi", path: webRoutes.about },
                                    { label: "Khuôn viên", path: webRoutes.campuses_client },
                                ].map((item) => (
                                    <li key={item.path}>
                                        <a
                                            href={item.path}
                                            className={`block py-2 ${isActive(item.path)
                                                ? "border-b-2 border-blue-700 text-blue-700"
                                                : "text-gray-700 hover:text-blue-700"
                                                }`}
                                            onClick={toggleNav}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Drawer>
                    ) : (
                        <ul className="flex justify-center items-center space-x-4 list-none text-sm md:text-base font-medium text-gray-700">
                            {[
                                { label: "Trang Chủ", path: webRoutes.home },
                                { label: "Về chúng tôi", path: webRoutes.about },
                                { label: "Khuôn viên", path: webRoutes.campuses_client },
                            ].map((item) => (
                                <li key={item.path}>
                                    <a
                                        href={item.path}
                                        className={`block py-2 no-underline ${isActive(item.path) ? "border-b-2 border-blue-700" : "text-gray-700 hover:text-blue-700"
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center gap-4">
                        <Button
                            type="default"
                            onClick={toggleBookingDrawer}
                            className="text-gray-700 hover:text-blue-700"
                        >
                            Đặt lịch
                        </Button>

                        {client.user ? (
                            <Dropdown overlay={menuDropdown} trigger={['click']} placement="bottomRight">
                                <Button type="default" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 border-none shadow-none hover:bg-gray-300 p-0 rounded-full">
                                    <Avatar icon={<UserOutlined />} />
                                    {client.user?.lastName}
                                </Button>
                            </Dropdown>
                        ) : (
                            <Button
                                type="default"
                                href={webRoutes.login}
                                className="text-gray-700 hover:text-blue-700"
                            >
                                Đăng nhập
                            </Button>
                        )}
                        {isMobile && (
                            <Button
                                type="default"
                                icon={<MenuOutlined />}
                                shape="circle"
                                className="text-gray-700 hover:text-blue-700"
                                onClick={toggleNav}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Drawer
                title="Đặt lịch"
                placement="bottom"
                onClose={toggleBookingDrawer}
                open={isBookingDrawerOpen}
                height={client.user ? 700 : 200}
                className="booking-drawer"
            >
                {client.user ? (
                    <BookingForm toggleBookingDrawer={toggleBookingDrawer} />
                ) : (
                    <div className="text-center text-gray-700">
                        <p>Cần đăng ký hoặc đăng nhập để thực hiện đặt lịch.</p>
                        <Button type="primary" href={webRoutes.login} className="mt-4">
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </Drawer>
        </header>
    );
};

export default HeaderClient;
