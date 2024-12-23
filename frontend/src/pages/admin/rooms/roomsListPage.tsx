import { useRef, useState } from 'react';
import { ProTable, ProColumns, ActionType, RequestData, TableDropdown, ProDescriptions } from '@ant-design/pro-components';
import { Button, Drawer, Modal, Space } from 'antd';
import { FiHome } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { apiRoutes } from '@/routes/api';
import { showNotification, NotificationType, handleErrorResponse } from '@/lib/utils';
import http from '@/lib/http';
import BasePageContainer from '@/components/layout/pageContainer';
import Icon, { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Room } from '@/interfaces/room';
import RoomForm from '@/components/forms/roomForm';

enum ActionKey {
    DELETE = 'delete',
    UPDATE = 'update',
}

const breadcrumb = {
    items: [
        {
            key: '/dashboard',
            title: <Link to="/dashboard">Bảng điều khiển</Link>,
        },
        {
            key: '/rooms',
            title: <Link to="/rooms">Danh sách phòng học</Link>,
        },
    ],
};

const RoomsListPage = () => {
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
            sorter: false,
        },
        {
            title: 'Trường',
            dataIndex: 'campus.name',
            align: 'center',
            ellipsis: true,
            render: (text, record) => record.campus?.name,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'campus.address',
            align: 'center',
            ellipsis: true,
            render: (text, record) => record.campus?.address,
        },
        {
            title: 'Email',
            dataIndex: 'campus.campusEmail',
            align: 'center',
            ellipsis: true,
            render: (text, record) => record.campus?.campusEmail,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'campus.campusPhoneNumber',
            align: 'center',
            ellipsis: true,
            render: (text, record) => record.campus?.campusPhoneNumber,
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: Room) => [
                <TableDropdown
                    key="actionGroup"
                    onSelect={(key) => handleActionOnSelect(key, row)}
                    menus={[
                        {
                            key: ActionKey.UPDATE,
                            name: (
                                <Space>
                                    <EditOutlined />
                                    Cập nhật
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

    const handleActionOnSelect = (key: string, row: Room) => {
        if (key === ActionKey.UPDATE) {
            handleEdit(row);
        } else if (key === ActionKey.DELETE) {
            showDeleteConfirmation(row);
        }
    };

    const showDeleteConfirmation = (row: Room) => {
        modal.confirm({
            title: 'Bạn chắc chắn muốn xóa phòng học này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title="Thông tin phòng học">
                    <ProDescriptions.Item valueType="text" label="Tên phòng">
                        {row.roomName}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Trường">
                        {row.campus.name}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.rooms}/${row.id}`)
                    .then(() => {
                        showNotification('Thành công', NotificationType.SUCCESS, 'Phòng học đã bị xóa');
                        actionRef.current?.reloadAndRest?.();
                    })
                    .catch((error) => {
                        handleErrorResponse(error);
                    });
            },
        });
    };

    const handleEdit = (row: Room) => {
        http
            .get(`${apiRoutes.rooms}/${row.id}`)
            .then((response) => {
                const roomData = response.data.data;
                setInitialValues(roomData);
                setDrawerVisible(true);
            })
            .catch(handleErrorResponse);
    };

    const handleCreate = () => {
        actionRef.current?.reloadAndRest?.();
        setDrawerVisible(false);
    };

    const handleOpenDrawer = () => {
        setDrawerVisible(true);
    };

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <BasePageContainer breadcrumb={breadcrumb}>
            <Button
                type="primary"
                onClick={handleOpenDrawer}
                className='absolute top-5 right-5 z-50'
            >
                Tạo mới phòng học
            </Button>

            <ProTable
                columns={columns}
                cardBordered={false}
                cardProps={{
                    subTitle: 'Danh sách phòng học',
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
                        .get(apiRoutes.rooms, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const rooms: [Room] = response.data.data;

                            return {
                                data: rooms,
                                success: true,
                                total: response.data.total,
                            } as RequestData<Room>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<Room>;
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
                title={initialValues ? "Cập nhật phòng học" : "Tạo mới phòng học"}
                width={640}
                onClose={handleCloseDrawer}
                visible={drawerVisible}
                footer={null}
            >
                <RoomForm onSubmit={handleCreate} initialValues={initialValues} />
            </Drawer>
        </BasePageContainer>
    );
};

export default RoomsListPage;
