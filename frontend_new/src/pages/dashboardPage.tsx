import { useEffect, useState } from 'react';
import BasePageContainer from '@/components/layout/pageContainer';
import { Avatar, BreadcrumbProps, Card, Col, Row, Table, Tag } from 'antd';
import { webRoutes } from '@/routes/web';
import { Link } from 'react-router-dom';
import { Bar, Column } from '@ant-design/charts';
import StatCard from '@/components/dashboard/statCard';
import { AiOutlineTeam } from 'react-icons/ai';
import { MdOutlineHome, MdOutlineEventAvailable } from 'react-icons/md';
import { BiBuilding } from 'react-icons/bi';
import http from '@/lib/http';
import { apiRoutes } from '@/routes/api';
import { handleErrorResponse } from '@/lib/utils';

const breadcrumb: BreadcrumbProps = {
    items: [
        {
            key: webRoutes.dashboard,
            title: <Link to={webRoutes.dashboard}>Bảng điều khiển</Link>,
        },
    ],
};

const DashboardPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]);
    const [campuses, setCampuses] = useState<any[]>([]);
    const [children, setChildren] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [signs, setSigns] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchData(apiRoutes.users, setUsers),
            fetchData(apiRoutes.rooms, setRooms),
            fetchData(apiRoutes.campuses, setCampuses),
            fetchData(apiRoutes.children, setChildren),
            fetchData(apiRoutes.bookings, setBookings),
            fetchData(apiRoutes.signs, setSigns),
        ])
            .then(() => setLoading(false))
            .catch((error) => {
                handleErrorResponse(error);
                setLoading(false);
            });
    }, []);

    const fetchData = async (endpoint: string, setter: (data: any[]) => void) => {
        try {
            const response = await http.get(endpoint, { params: { per_page: 5 } });
            setter(response.data.data);
        } catch (error) {
            handleErrorResponse(error);
        }
    };

    const chartData = [
        { type: 'Người dùng', value: users.length },
        { type: 'Phòng', value: rooms.length },
        { type: 'Cơ sở', value: campuses.length },
        { type: 'Đặt phòng', value: bookings.length },
        { type: 'Trẻ em', value: children.length },
        { type: 'Dấu hiệu', value: signs.length },
    ];

    const chartConfigColumn = {
        data: chartData,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'middle',
            style: {
                fill: '#fff',
                opacity: 0.6,
            },
        },
    };

    const chartConfigBar = {
        data: chartData,
        xField: 'type',
        yField: 'value',
        color: '#4B9F80',
        label: {
            position: 'middle',
            style: {
                fill: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
            },
        },
        barWidthRatio: 0.8,
        tooltip: {
            formatter: (datum: any) => ({ name: datum.type, value: datum.value }),
        },
        meta: {
            value: {
                alias: 'Số lượng',
            },
        },
    };

    return (
        <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Row gutter={24}>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<AiOutlineTeam />}
                                title="Người dùng"
                                number={users.length}
                            />
                        </Col>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<MdOutlineHome />}
                                title="Phòng"
                                number={rooms.length}
                            />
                        </Col>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<BiBuilding />}
                                title="Cơ sở"
                                number={campuses.length}
                            />
                        </Col>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<MdOutlineEventAvailable />}
                                title="Đặt phòng"
                                number={bookings.length}
                            />
                        </Col>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<AiOutlineTeam />}
                                title="Trẻ em"
                                number={children.length}
                            />
                        </Col>
                        <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                            <StatCard
                                loading={loading}
                                icon={<MdOutlineEventAvailable />}
                                title="Ký vào/ra"
                                number={signs.length}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[24, 24]}>
                        <Col xl={12} lg={24} sm={24} xs={24}>
                            <Card title="Biểu đồ Cột" bordered={false} className="w-full">
                                <Column {...chartConfigColumn} className="w-full" />
                            </Card>
                        </Col>

                        <Col xl={12} lg={24} sm={24} xs={24}>
                            <Card title="Biểu đồ Bar" bordered={false} className="w-full">
                                <Bar {...chartConfigBar} className="w-full" />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </BasePageContainer>
    );
};

export default DashboardPage;
