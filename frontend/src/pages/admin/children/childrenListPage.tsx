import { useRef, useState } from 'react';
import { ProTable, ProColumns, ActionType, RequestData, TableDropdown, ProDescriptions } from '@ant-design/pro-components';
import { Button, Drawer, Modal, Space } from 'antd';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { apiRoutes } from '@/routes/api';
import { showNotification, NotificationType, handleErrorResponse } from '@/lib/utils';
import http from '@/lib/http';
import BasePageContainer from '@/components/layout/pageContainer';
import Icon, { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Child } from '@/interfaces/child';
import ChildForm from '@/components/forms/childForm';

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
            key: '/children',
            title: <Link to="/children">Danh sách con</Link>,
        },
    ],
};

const ChildrenListPage = () => {
    const actionRef = useRef<ActionType>();
    const [modal, modalContextHolder] = Modal.useModal();

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [initialValues, setInitialValues] = useState<Child | null>(null);

    const columns: ProColumns[] = [
        {
            title: 'Thông tin cha/mẹ',
            dataIndex: 'user',
            render: (_, row: Child) => (
                <div className="flex flex-wrap justify-start items-start">
                    <div className="flex-1">
                        <span className="font-bold">Tên cha/mẹ:</span> {row.user.firstName} {row.user.lastName}
                    </div>
                    <div className="flex-0">
                        <span className="font-bold">Email:</span> {row.user.email}
                    </div>
                </div>

            ),
        },
        {
            title: 'Họ và tên',
            dataIndex: 'firstName',
            align: 'center',
            ellipsis: true,
            sorter: false,
            render: (_, row: Child) => `${row.createdDate} ${row.lastName}`,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            sorter: false,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            align: 'center',
            ellipsis: true,
            render: (_, row: Child) => format(new Date(row.birthday), 'dd/MM/yyyy', { locale: vi }),
        },
        {
            title: 'Ngày tham gia',
            dataIndex: 'createdDate',
            align: 'center',
            ellipsis: true,
            render: (_, row: Child) => format(new Date(row.createdDate), 'dd/MM/yyyy HH:mm:ss', { locale: vi }),
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: Child) => [
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

    const handleActionOnSelect = (key: string, row: any) => {
        if (key === ActionKey.UPDATE) {
            handleEdit(row);
        } else if (key === ActionKey.DELETE) {
            showDeleteConfirmation(row);
        }
    };

    const showDeleteConfirmation = (row: any) => {
        modal.confirm({
            title: 'Bạn chắc chắn muốn xóa trẻ em này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title="Thông tin trẻ em">
                    <ProDescriptions.Item valueType="text" label="Họ và Tên">
                        {row.firstName} {row.lastName}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Giới tính">
                        {row.gender}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.children}/${row.id}`)
                    .then(() => {
                        showNotification('Thành công', NotificationType.SUCCESS, 'Trẻ em đã bị xóa');
                        actionRef.current?.reloadAndRest?.();
                    })
                    .catch((error) => {
                        handleErrorResponse(error);
                    });
            },
        });
    };

    const handleEdit = (row: Child) => {
        http
            .get(`${apiRoutes.children}/${row.id}`)
            .then((response) => {
                const childData = response.data.data;
                setInitialValues(childData);
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
                Tạo mới trẻ em
            </Button>

            <ProTable
                columns={columns}
                cardBordered={false}
                cardProps={{
                    subTitle: 'Danh sách trẻ em',
                    title: <FiUsers className="opacity-60" />,
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
                        .get(apiRoutes.children, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const children: [Child] = response.data.data;

                            return {
                                data: children,
                                success: true,
                                total: response.data.total,
                            } as RequestData<Child>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<Child>;
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
                title={initialValues ? "Cập nhật trẻ em" : "Tạo mới trẻ em"}
                width={640}
                onClose={handleCloseDrawer}
                visible={drawerVisible}
                footer={null}
            >
                <ChildForm onSubmit={handleCreate} initialValues={initialValues} />
            </Drawer>
        </BasePageContainer>
    );
};

export default ChildrenListPage;
