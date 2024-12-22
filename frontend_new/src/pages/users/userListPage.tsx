import {
    ActionType,
    ProTable,
    ProColumns,
    RequestData,
    TableDropdown,
    ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, Badge, BreadcrumbProps, Modal, Space } from 'antd';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { User } from '@/interfaces/user';
import { apiRoutes } from '@/routes/api';
import { webRoutes } from '@/routes/web';
import {
    handleErrorResponse,
    NotificationType,
    showNotification,
} from '@/lib/utils';
import http from '@/lib/http';
import BasePageContainer from '@/components/layout/pageContainer';
import LazyImage from '@/components/lazy-image';
import Icon, {
    ExclamationCircleOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

enum ActionKey {
    DELETE = 'delete',
    UPDATE = 'update',
}

const breadcrumb: BreadcrumbProps = {
    items: [
        {
            key: webRoutes.dashboard,
            title: <Link to={webRoutes.dashboard}>Bảng điều khiển</Link>,
        },
        {
            key: webRoutes.users,
            title: <Link to={webRoutes.users}>Người dùng</Link>,
        },
    ],
};

const UserListPage = () => {
    const actionRef = useRef<ActionType>();
    const [modal, modalContextHolder] = Modal.useModal();

    const columns: ProColumns[] = [
        {
            title: 'Vai trò',
            dataIndex: 'role',
            align: 'center',
            render: (_, row: User) => {
                let roleColor = '';
                let roleText = '';

                switch (row.role) {
                    case 'ROLE_ADMIN':
                        roleColor = 'green';
                        roleText = 'Admin';
                        break;
                    case 'ROLE_CLIENT':
                        roleColor = 'blue';
                        roleText = 'Phụ huynh';
                        break;
                    case 'ROLE_TEACHER':
                        roleColor = 'orange';
                        roleText = 'Giáo viên';
                        break;
                    default:
                        roleColor = 'default';
                        roleText = 'Chưa xác định';
                }

                return <Badge color={roleColor} text={roleText} />;
            },
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            sorter: false,
            align: 'center',
            ellipsis: true,
            render: (_, row: User) => `${row.firstName} ${row.lastName}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: false,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Con em',
            dataIndex: 'children',
            align: 'center',
            render: (_, row: User) => {
                if (row.children && row.children.length > 0) {
                    return row.children.map((child) => {
                        return (
                            <div key={child.id}>
                                <p>{`${child.firstName} ${child.lastName}`}</p>
                                <p>Giới tính: {child.gender}</p>
                                <p>Ngày sinh: {child.birthday}</p>
                            </div>
                        );
                    });
                }
                return 'Không có';
            },
        },
        {
            title: 'Tham gia ngày',
            dataIndex: 'createdDate',
            align: 'center',
            render: (_, row: User) => {
                if (row.createdDate) {
                    return format(new Date(row.createdDate), 'dd/MM/yyyy HH:mm:ss', {
                        locale: vi
                    });
                }
                return '-';
            },
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: User) => [
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

    const handleActionOnSelect = (key: string, user: User) => {
        if (key === ActionKey.DELETE) {
            showDeleteConfirmation(user);
        }
    };

    const showDeleteConfirmation = (user: User) => {
        modal.confirm({
            title: 'Bạn chắc chắn xoá người dùng này chứ?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title=" ">
                    <ProDescriptions.Item valueType="text" label="Họ và Tên">
                        {user.firstName} {user.lastName}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Email">
                        {user.email}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.users}/${user.id}`)
                    .then(() => {
                        showNotification(
                            'Thành công',
                            NotificationType.SUCCESS,
                            'Người dùng đã xoá'
                        );

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
                    subTitle: 'Người dùng',
                    tooltip: {
                        className: 'opacity-60',
                        title: 'Dữ liệu mới nhất',
                    },
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
                        .get(apiRoutes.users, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const users: [User] = response.data.data;

                            return {
                                data: users,
                                success: true,
                                total: response.data.total,
                            } as RequestData<User>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<User>;
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
        </BasePageContainer>
    );
};

export default UserListPage;
