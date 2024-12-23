import { Button, Form, Input, DatePicker, Select, message } from 'antd';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRoutes } from '@/routes/api';
import { webRoutes } from '@/routes/web';
import { handleErrorResponse } from '@/lib/utils';
import { defaultHttp } from '@/lib/http';

interface FormValues {
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
}

const ChildRegisterForm = ({ userId }: { userId: number }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const onSubmit = (values: FormValues) => {
        setLoading(true);

        defaultHttp
            .post(apiRoutes.children, {
                ...values,
                userId,
            })
            .then(() => {
                message.success('Thông tin con em đã được đăng ký thành công!');
                navigate(webRoutes.home);
            })
            .catch((error) => {
                handleErrorResponse(error);
                setLoading(false);
            });
    };

    return (
        <Fragment>
            <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-2xl opacity-60 my-0">
                    Đăng ký thông tin con em
                </h3>
                <p className="text-sm text-gray-400">
                    Nhập thông tin chi tiết để hoàn tất đăng ký
                </p>
            </div>
            <Form
                className="space-y-4 md:space-y-6"
                form={form}
                name="child-register"
                onFinish={onSubmit}
                layout={'vertical'}
                requiredMark={false}
            >
                <div>
                    <Form.Item
                        name="firstName"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Tên
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên của con em',
                        }]}
                    >
                        <Input
                            placeholder="John"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="lastName"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Họ
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập họ của con em',
                        }]}
                    >
                        <Input
                            placeholder="Doe"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="gender"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Giới tính
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn giới tính của con em',
                        }]}
                    >
                        <Select
                            placeholder="Chọn giới tính"
                            className="bg-gray-50 text-gray-900 sm:text-sm"
                        >
                            <Select.Option value="Male">Nam</Select.Option>
                            <Select.Option value="Female">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="birthday"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Ngày sinh
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn ngày sinh của con em',
                        }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Chọn ngày sinh"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5 w-full"
                        />
                    </Form.Item>
                </div>
                <div className="text-center">
                    <Button
                        className="mt-4"
                        block
                        loading={loading}
                        type="primary"
                        size="large"
                        htmlType={'submit'}
                    >
                        Hoàn tất
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default ChildRegisterForm;
