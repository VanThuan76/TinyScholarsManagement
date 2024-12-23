import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';

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
    const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.imgUrl || null);
    const [uploading, setUploading] = useState<boolean>(false);

    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            setIsUpdate(true);
            setImageUrl(initialValues.imgUrl || null);
        }
    }, [initialValues, form]);

    const handlePreview = (file: RcFile) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async (file: RcFile) => {
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        try {
            const response = await http.post(apiRoutes.upload, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const url = response.data.data[0].url;
            setImageUrl(url);
            showNotification('Thành công', NotificationType.SUCCESS, 'Tải ảnh lên thành công');
            setUploading(false);
        } catch (error) {
            handleErrorResponse(error);
            setUploading(false);
        }

        return false;
    };

    const handleFinish = (values: Campus) => {
        const payload = { ...values, imgUrl: imageUrl };

        if (isUpdate) {
            http.put(`${apiRoutes.campuses}/${initialValues?.id}`, payload)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Cập nhật khuôn viên thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        } else {
            http.post(apiRoutes.campuses, payload)
                .then(() => {
                    showNotification('Thành công', NotificationType.SUCCESS, 'Tạo mới khuôn viên thành công');
                    onSubmit();
                })
                .catch(handleErrorResponse);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
        >
            <Form.Item
                label="Tên khuôn viên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên khuôn viên!' }]}
            >
                <Input placeholder="Nhập tên khuôn viên" />
            </Form.Item>

            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
                <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
                label="Email khuôn viên"
                name="campusEmail"
                rules={[
                    { required: true, message: 'Vui lòng nhập email khuôn viên!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                ]}
            >
                <Input placeholder="Nhập email khuôn viên" />
            </Form.Item>

            <Form.Item
                label="Số điện thoại khuôn viên"
                name="campusPhoneNumber"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại khuôn viên!' },
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
                ]}
            >
                <Input placeholder="Nhập số điện thoại khuôn viên" />
            </Form.Item>

            <Form.Item label="Ảnh khuôn viên">
                <Upload
                    name="file"
                    listType="picture"
                    showUploadList={false}
                    beforeUpload={(file) => {
                        handlePreview(file);
                        return handleUpload(file);
                    }}
                    accept="image/*"
                >
                    <Button icon={<UploadOutlined />} loading={uploading}>
                        Tải ảnh lên
                    </Button>
                </Upload>
                {imageUrl && (
                    <div className="mt-2">
                        <img src={imageUrl} alt="Ảnh trường" className="object-cover rounded-md" style={{ width: '100%', maxHeight: 200 }} />
                    </div>
                )}
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
