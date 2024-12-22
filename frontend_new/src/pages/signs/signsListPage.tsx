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
import { Sign } from '@/interfaces/sign';

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
            key: '/signs',
            title: <Link to="/signs">Danh sách ký vào/ra</Link>,
        },
    ],
};

const SignsListPage = () => {
    const actionRef = useRef<ActionType>();
    const [modal, modalContextHolder] = Modal.useModal();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [initialValues, setInitialValues] = useState<any | null>(null);

    const columns: ProColumns[] = [
        {
            title: 'Loại ký',
            dataIndex: 'type',
            align: 'center',
            render: (value) => (value === 'in' ? 'Ký vào' : 'Ký ra'),
        },
        {
            title: 'Thời gian ký',
            dataIndex: 'signTime',
            align: 'center',
            render: (value) => new Date(value as string).toLocaleString(),
        },
        {
            title: 'Người ký',
            dataIndex: 'user.username',
            align: 'center',
            render: (_, record) => record.user?.username || 'Không xác định',
        },
        {
            title: 'Tên trẻ',
            dataIndex: 'booking.child.firstName',
            align: 'center',
            render: (_, record) => `${record.booking?.child?.firstName} ${record.booking?.child?.lastName}`,
        },
        {
            title: 'Tên trường',
            dataIndex: 'booking.campus.name',
            align: 'center',
            render: (_, record) => record.booking?.campus?.name || 'Không xác định',
        },
        {
            title: 'Hành động',
            align: 'center',
            key: 'option',
            fixed: 'right',
            render: (_, row: Sign) => [
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

    const handleActionOnSelect = (key: string, row: Sign) => {
        if (key === ActionKey.DETAIL) {
            setInitialValues(row);
            setDrawerVisible(true);
        } else if (key === ActionKey.DELETE) {
            showDeleteConfirmation(row);
        }
    };

    const showDeleteConfirmation = (row: Sign) => {
        modal.confirm({
            title: 'Bạn chắc chắn muốn xóa bản ký này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <ProDescriptions column={1} title="Thông tin ký">
                    <ProDescriptions.Item valueType="text" label="Loại ký">
                        {row.type === 'in' ? 'Ký vào' : 'Ký ra'}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item valueType="text" label="Thời gian ký">
                        {new Date(row.signTime).toLocaleString()}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            onOk: () => {
                return http
                    .delete(`${apiRoutes.signs}/${row.id}`)
                    .then(() => {
                        showNotification('Thành công', NotificationType.SUCCESS, 'Bản ký đã bị xóa');
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
                    subTitle: 'Danh sách ký vào/ra',
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
                        .get(apiRoutes.signs, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const signs: [Sign] = response.data.data;

                            return {
                                data: signs,
                                success: true,
                                total: response.data.total,
                            } as RequestData<Sign>;
                        })
                        .catch((error) => {
                            handleErrorResponse(error);

                            return {
                                data: [],
                                success: false,
                            } as RequestData<Sign>;
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
                title={initialValues ? "Chi tiết bản ký" : ""}
                width={640}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                footer={null}
            >
                {initialValues && (
                    <ProDescriptions column={1} title="Thông tin chi tiết">
                        <ProDescriptions.Item label="Loại ký" valueType="text">
                            {initialValues.type === 'in' ? 'Ký vào' : 'Ký ra'}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Thời gian ký" valueType="text">
                            {new Date(initialValues.signTime).toLocaleString()}
                        </ProDescriptions.Item>

                        <Divider orientation="center" className="w-full" />

                        <ProDescriptions.Item label="Tên người ký" valueType="text">
                            {initialValues.user?.username || 'Không xác định'}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Email người ký" valueType="text">
                            {initialValues.user?.email}
                        </ProDescriptions.Item>

                        <Divider orientation="center" className="w-full" />

                        <ProDescriptions.Item label="Tên trẻ" valueType="text">
                            {`${initialValues.booking?.child?.firstName} ${initialValues.booking?.child?.lastName}`}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item label="Tên trường" valueType="text">
                            {initialValues.booking?.campus?.name || 'Không xác định'}
                        </ProDescriptions.Item>
                    </ProDescriptions>
                )}
            </Drawer>
        </BasePageContainer>
    );
};

export default SignsListPage;
