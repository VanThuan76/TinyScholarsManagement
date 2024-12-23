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
import CampusForm from '@/components/forms/campusForm';
import { Campus } from '@/interfaces/campus';

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
            key: '/campus',
            title: <Link to="/campus">Danh sách khuôn viên</Link>,
        },
    ],
};

const CampusesListPage = () => {
    const actionRef = useRef<ActionType>();
    const [modal, modalContextHolder] = Modal.useModal();

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [initialValues, setInitialValues] = useState<any | null>(null);

    const columns: ProColumns[] = [
        {
            title: 'Ảnh',
            dataIndex: 'imgUrl',
            align: 'center',
            ellipsis: true,
            render: (_, row: Campus) => (
                <img src={row.imgUrl} alt="Campus" className='w-10 h-10 object-cover rounded-md' />
            ),
        },
        {
            title: 'Tên trường',
            dataIndex: 'name',
            align: 'center',
            ellipsis: true,
            sorter: false,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'campusEmail',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'campusPhoneNumber',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Số phòng học',
            dataIndex: 'rooms',
            align: 'center',
            render: (_, row: Campus) => row.rooms.length,
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: Campus) => [
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

    const handleActionOnSelect = (key: string, row: Campus) => {
        if (key === ActionKey.UPDATE) {
            handleEdit(row);
        } else if (key === ActionKey.DELETE) {
            showDeleteConfirmation(row);
        }
    };

    const showDeleteConfirmation = (row: Campus) => {
        modal.confirm({
            title: 'Bạn chắc chắn muốn xóa khuôn viên này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title="Thông tin khuôn viên">
                    <ProDescriptions.Item valueType="text" label="Tên trường">
                        {row.name}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Địa chỉ">
                        {row.address}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.campuses}/${row.id}`)
                    .then(() => {
                        showNotification('Thành công', NotificationType.SUCCESS, 'Khuôn viên đã bị xóa');
                        actionRef.current?.reloadAndRest?.();
                    })
                    .catch((error) => {
                        handleErrorResponse(error);
                    });
            },
        });
    };

    const handleEdit = (row: Campus) => {
        http
            .get(`${apiRoutes.campuses}/${row.id}`)
            .then((response) => {
                const campusData = response.data.data;
                setInitialValues(campusData);
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
                Tạo mới khuôn viên
            </Button>

            <ProTable
                columns={columns}
                cardBordered={false}
                cardProps={{
                    subTitle: 'Danh sách khuôn viên',
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
                        .get(apiRoutes.campuses, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const campuses: [Campus] = response.data.data;

                            return {
                                data: campuses,
                                success: true,
                                total: response.data.total,
                            } as RequestData<Campus>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<Campus>;
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
                title={initialValues ? "Cập nhật khuôn viên" : "Tạo mới khuôn viên"}
                width={640}
                onClose={handleCloseDrawer}
                visible={drawerVisible}
                footer={null}
            >
                <CampusForm onSubmit={handleCreate} initialValues={initialValues} />
            </Drawer>
        </BasePageContainer>
    );
};

export default CampusesListPage;
