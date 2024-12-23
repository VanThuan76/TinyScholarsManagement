import { useRef, useState } from 'react';
import { ProTable, ProColumns, ActionType, RequestData, TableDropdown, ProDescriptions } from '@ant-design/pro-components';
import { Divider, Drawer, Modal, Space } from 'antd';
import { FiHome } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { apiRoutes } from '@/routes/api';
import { showNotification, NotificationType, handleErrorResponse } from '@/lib/utils';
import http from '@/lib/http';
import BasePageContainer from '@/components/layout/pageContainer';
import Icon, { ExclamationCircleOutlined, InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Booking } from '@/interfaces/booking';

enum ActionKey {
    DETAIL = 'detail',
    DELETE = 'delete',
}

const breadcrumb = {
    items: [
        {
            key: '/dashboard',
            title: <Link to="/dashboard">Bảng điều khiển</Link>,
        },
        {
            key: '/bookings',
            title: <Link to="/bookings">Danh sách đặt phòng</Link>,
        },
    ],
};

const BookingsListPage = () => {
    const actionRef = useRef<ActionType>();
    const [modal, modalContextHolder] = Modal.useModal();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [initialValues, setInitialValues] = useState<any | null>(null);


    const columns: ProColumns[] = [
        {
            title: 'Tên phòng',
            dataIndex: 'roomName',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'bookedDate',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'bookTimeFrom',
            align: 'center',
            render: (value) => new Date(value as string).toLocaleString(),
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'bookTimeTo',
            align: 'center',
            render: (value) => new Date(value as string).toLocaleString(),
        },
        {
            title: 'Khuôn viên',
            dataIndex: 'campus.name',
            align: 'center',
            ellipsis: true,
            render: (text, record) => record.campus?.name
        },
        {
            title: 'Tên trẻ',
            dataIndex: 'child.firstName',
            align: 'center',
            ellipsis: true,
            render: (text, record) => `${record.child?.firstName} ${record.child?.lastName}`
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: Booking) => [
                <TableDropdown
                    key="actionGroup"
                    onSelect={(key) => handleActionOnSelect(key, row)}
                    menus={[
                        {
                            key: ActionKey.DETAIL,
                            name: (
                                <Space>
                                    <InfoCircleOutlined />
                                    Xem chi tiết
                                </Space>
                            ),
                        },
                        {
                            key: ActionKey.DELETE,
                            name: (
                                <Space>
                                    <DeleteOutlined />
                                    Xóa
                                </Space>
                            ),
                        },
                    ]}
                >
                    <Icon component={CiCircleMore} className="text-rfprimary text-xl" />
                </TableDropdown>,
            ],
        },
    ];

    const handleActionOnSelect = (key: string, row: Booking) => {
        if (key === ActionKey.DETAIL) {
            setInitialValues(row);
            setDrawerVisible(true);
        } else if (key === ActionKey.DELETE) {
            showDeleteConfirmation(row);
        }
    };


    const showDeleteConfirmation = (row: Booking) => {
        modal.confirm({
            title: 'Bạn chắc chắn muốn xóa đặt phòng này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title="Thông tin đặt phòng">
                    <ProDescriptions.Item valueType="text" label="Tên phòng">
                        {row.roomName}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Ngày đặt">
                        {row.bookedDate}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.bookings}/${row.id}`)
                    .then(() => {
                        showNotification('Thành công', NotificationType.SUCCESS, 'Đặt phòng đã bị xóa');
                        actionRef.current?.reloadAndRest?.();
                    })
                    .catch((error) => {
                        handleErrorResponse(error);
                    });
            },
        });
    };


    return (
        <BasePageContainer breadcrumb={breadcrumb}>
            <ProTable
                columns={columns}
                cardBordered={false}
                cardProps={{
                    subTitle: 'Danh sách đặt phòng',
                    title: <FiHome className="opacity-60" />,
                }}
                bordered={true}
                showSorterTooltip={false}
                scroll={{ x: true }}
                tableLayout={'fixed'}
                rowSelection={false}
                pagination={{
                    showQuickJumper: true,
                    pageSize: 10,
                }}
                actionRef={actionRef}
                request={(params) => {
                    return http
                        .get(apiRoutes.bookings, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const bookings: [Booking] = response.data.data;

                            return {
                                data: bookings,
                                success: true,
                                total: response.data.total,
                            } as RequestData<Booking>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<Booking>;
                        });
                }}
                dateFormatter="string"
                search={false}
                rowKey="id"
                options={{
                    search: false,
                }}
            />
            {modalContextHolder}
            <Drawer
                title={initialValues ? "Chi tiết đặt phòng" : ""}
                width={640}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                footer={null}
            >
                {initialValues && (
                    <ProDescriptions column={1} title="Thông tin đặt phòng">
                        <ProDescriptions.Item label="Tên phòng" valueType="text">
                            {initialValues.roomName}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Ngày đặt" valueType="date">
                            {initialValues.bookedDate}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Giờ bắt đầu" valueType="text">
                            {new Date(initialValues.bookTimeFrom).toLocaleTimeString()}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Giờ kết thúc" valueType="text">
                            {new Date(initialValues.bookTimeTo).toLocaleTimeString()}
                        </ProDescriptions.Item>


                        <Divider orientation="center" className='w-full' />

                        <ProDescriptions.Item label="Tên trẻ" valueType="text">
                            {`${initialValues.child?.firstName} ${initialValues.child?.lastName}`}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Ngày sinh của trẻ" valueType="date">
                            {initialValues.child?.birthday}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Giới tính của trẻ" valueType="text">
                            {initialValues.child?.gender}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Tên phụ huynh" valueType="text">
                            {`${initialValues.child?.user?.firstName || ''} ${initialValues.child?.user?.lastName || ''}`}
                        </ProDescriptions.Item>

                        <Divider orientation="center" className='w-full' />

                        <ProDescriptions.Item label="Khuôn viên" valueType="text">
                            {initialValues.campus?.name}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Địa chỉ trường" valueType="text">
                            {initialValues.campus?.address}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Email trường" valueType="text">
                            {initialValues.campus?.campusEmail}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Số điện thoại trường" valueType="text">
                            {initialValues.campus?.campusPhoneNumber}
                        </ProDescriptions.Item>

                        <Divider orientation="center" className='w-full' />

                        <ProDescriptions.Item label="Phòng khác trong trường" valueType="text">
                            {initialValues.campus?.rooms.map((room: any) => room.roomName).join(', ')}
                        </ProDescriptions.Item>
                    </ProDescriptions>
                )}
            </Drawer>

        </BasePageContainer>
    );
};

export default BookingsListPage;
