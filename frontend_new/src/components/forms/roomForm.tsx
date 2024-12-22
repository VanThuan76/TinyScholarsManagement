import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { handleErrorResponse, showNotification, NotificationType } from '@/lib/utils';
import { apiRoutes } from '@/routes/api';
import http from '@/lib/http';

interface RoomFormProps {
    onSubmit: () => void;
    initialValues?: any;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [campuses, setCampuses] = useState<any[]>([]);

    React.useEffect(() => {
        http
            .get(apiRoutes.campuses)
            .then((response) => {
                setCampuses(response.data.data);
            })
            .catch(handleErrorResponse);

        if (initialValues) {
            form.setFieldsValue(initialValues);
            setIsUpdate(true);
        }
    }, [initialValues, form]);

    const handleFinish = (values: any) => {
        if (isUpdate) {
            http.put(`${apiRoutes.rooms}/${initialValues?.id}`, values)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Cập nhật phòng học thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        } else {
            http.post(apiRoutes.rooms, values)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Tạo mới phòng học thành công');
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
                label="Tên phòng"
                name="roomName"
                rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
            >
                <Input placeholder="Nhập tên phòng" />
            </Form.Item>

            <Form.Item
                label="Trường"
                name="campusId"
                rules={[{ required: true, message: 'Vui lòng chọn trường!' }]}
            >
                <Select placeholder="Chọn trường">
                    {campuses.map((campus) => (
                        <Select.Option key={campus.id} value={campus.id}>
                            {campus.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {initialValues ? 'Cập nhật' : 'Tạo mới'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RoomForm;
