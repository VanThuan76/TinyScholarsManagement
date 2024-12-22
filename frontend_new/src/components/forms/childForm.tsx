import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { handleErrorResponse, showNotification, NotificationType } from '@/lib/utils';
import http from '@/lib/http';
import { apiRoutes } from '@/routes/api';
import dayjs from 'dayjs';
import { User } from '@/interfaces/user';
import { Child } from '@/interfaces/child';

const { Option } = Select;

const ChildForm = ({ onSubmit, initialValues }: { onSubmit: any, initialValues: Child | null }) => {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        http.get(apiRoutes.users)
            .then(response => {
                setUsers(response.data.data);
            })
            .catch(handleErrorResponse);

        if (initialValues) {
            form.setFieldsValue({
                firstName: initialValues.firstName,
                lastName: initialValues.lastName,
                gender: initialValues.gender,
                birthday: dayjs(initialValues.birthday),
                userId: initialValues.user.id,
            });
            setIsUpdate(true);
        }
    }, [initialValues, form]);

    const handleFinish = (values: any) => {
        const childData = {
            ...values,
            birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
        };

        if (isUpdate) {
            http.put(`${apiRoutes.children}/${initialValues?.id}`, childData)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Cập nhật trẻ em thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        } else {
            http.post(apiRoutes.children, childData)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Tạo mới trẻ em thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleFinish}
            className='flex flex-col justify-start items-start w-full'
        >
            <Form.Item
                name="userId"
                label="Cha/mẹ"
                rules={[{ required: true, message: 'Vui lòng chọn cha/mẹ' }]}
                className='w-full'
            >
                <Select placeholder="Chọn cha/mẹ">
                    {users.length > 0 && users.map((user) => (
                        <Option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="firstName"
                label="Tên"
                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                className='w-full'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Họ"
                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                className='w-full'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                className='w-full'
            >
                <Select placeholder="Chọn giới tính">
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="birthday"
                label="Ngày sinh"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                className='w-full'
            >
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item className='w-full'>
                <Button type="primary" htmlType="submit">
                    {isUpdate ? 'Cập nhật' : 'Tạo mới'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChildForm;
