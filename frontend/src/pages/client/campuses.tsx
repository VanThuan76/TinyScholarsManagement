import React, { useEffect, useState } from "react";
import { Button, Card, Drawer } from "antd";
import { Campus } from "@/interfaces/campus";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/lib/utils";
import BookingForm from "@/components/forms/bookingForm";
import { useSelector } from "react-redux";
import { ClientState } from "@/store/slices/clientSlice";
import { webRoutes } from "@/routes/web";


const CampusesPage: React.FC = () => {
    const [campuses, setCampuses] = useState<Campus[]>([]);
    const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
    const [initData, setInitData] = useState<{ campusId?: any; campusName?: string } | null>(null);

    const client = useSelector((state: { client: ClientState }) => state.client);

    useEffect(() => {
        http.get(apiRoutes.campuses)
            .then(response => {
                setCampuses(response.data.data);
            })
            .catch(handleErrorResponse);
    }, []);

    const toggleBookingDrawer = () => {
        setIsBookingDrawerOpen(!isBookingDrawerOpen);
    };

    const handleBookingClick = (campus: Campus) => {
        setInitData({ campusId: campus.id, campusName: campus.name });
        toggleBookingDrawer();
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-10">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {campuses.map((campus) => (
                        <Card
                            key={campus.id}
                            className="rounded-lg shadow-md"
                            cover={<img alt={campus.name} src={campus.imgUrl} className="rounded-t-lg object-top h-48 w-full object-cover" />}
                        >
                            <div className="text-center">
                                <h2 className="text-lg font-bold mb-2">{campus.name}</h2>
                                <p className="text-gray-600 text-sm mb-2">{campus.address}</p>
                                <p className="text-gray-600 text-sm mb-4">{campus.campusEmail}</p>
                                <Button
                                    type="primary"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                                    onClick={() => handleBookingClick(campus)}
                                >
                                    Đăng ký tham quan ngay
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <Drawer
                title="Đặt lịch"
                placement="bottom"
                onClose={toggleBookingDrawer}
                open={isBookingDrawerOpen}
                height={client ? 700 : 200}
                className="booking-drawer"
            >
                {client ? (
                    <BookingForm toggleBookingDrawer={toggleBookingDrawer} initData={initData} />
                ) : (
                    <div className="text-center text-gray-700">
                        <p>Cần đăng ký hoặc đăng nhập để thực hiện đặt lịch.</p>
                        <Button type="primary" href={webRoutes.login} className="mt-4">
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default CampusesPage;
