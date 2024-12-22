import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { handleErrorResponse, showNotification, NotificationType } from '@/lib/utils';
import { Campus } from '@/interfaces/campus';
import { apiRoutes } from '@/routes/api';

import http from '@/lib/http';

interface CampusFormProps {
    onSubmit: () => void;
    initialValues?: Campus;
}

const CampusForm: React.FC<CampusFormProps> = ({ onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            setIsUpdate(true);
        }
    }, [initialValues, form]);

    const handleFinish = (values: Campus) => {
        if (isUpdate) {
            http.put(`${apiRoutes.campuses}/${initialValues?.id}`, values)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Cập nhật trường học thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        } else {
            http.post(apiRoutes.campuses, values)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Tạo mới trường học thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
        >
            <Form.Item
                label="Tên trường"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
            >
                <Input placeholder="Nhập tên trường" />
            </Form.Item>

            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
                <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
                label="Email trường"
                name="campusEmail"
                rules={[
                    { required: true, message: 'Vui lòng nhập email trường!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                ]}
            >
                <Input placeholder="Nhập email trường" />
            </Form.Item>

            <Form.Item
                label="Số điện thoại trường"
                name="campusPhoneNumber"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại trường!' },
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
                ]}
            >
                <Input placeholder="Nhập số điện thoại trường" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {initialValues ? 'Cập nhật' : 'Tạo mới'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CampusForm;
