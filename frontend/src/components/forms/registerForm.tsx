import { Button, Form, Input, Select } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { apiRoutes } from '@/routes/api';
import { handleErrorResponse, setPageTitle } from '@/lib/utils';
import { defaultHttp } from '@/lib/http';
import { webRoutes } from '@/routes/web';

const { Option } = Select;

interface FormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    relationship: string;
}

const RegisterForm = ({ onSuccess }: { onSuccess: (userId: number) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setPageTitle(`Register - ${CONFIG.appName}`);
    }, []);

    const onSubmit = (values: FormValues) => {
        setLoading(true);

        defaultHttp
            .post(apiRoutes.register, {
                ...values,
                role: "ROLE_CLIENT",
            })
            .then((response) => {
                const createdUserId = response.data.data.id;
                onSuccess(createdUserId);
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
                    Đăng ký tài khoản
                </h3>
                <p className="text-sm text-gray-400">
                    Nhập thông tin cá nhân để tạo tài khoản
                </p>
            </div>
            <Form
                className="space-y-4 md:space-y-6"
                form={form}
                name="register"
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
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên của bạn',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nguyễn"
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
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ của bạn',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Văn A"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="username"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Tên đăng nhập
                            </p>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập của bạn',
                            },
                        ]}
                    >
                        <Input
                            placeholder="username_123"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="email"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Email
                            </p>
                        }
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Vui lòng nhập địa chỉ email hợp lệ',
                            },
                        ]}
                    >
                        <Input
                            placeholder="example@gmail.com"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="password"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Mật khẩu
                            </p>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu của bạn',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="••••••••"
                            visibilityToggle={false}
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="relationship"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Quan hệ
                            </p>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn quan hệ của bạn',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn quan hệ"
                            className="bg-gray-50 text-gray-900 sm:text-sm"
                        >
                            <Option value="father">Cha</Option>
                            <Option value="mother">Mẹ</Option>
                            <Option value="mother">Ông/Bà</Option>
                            <Option value="relative">Người thân</Option>
                        </Select>
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
                        Đăng ký
                    </Button>
                </div>

                <div className="text-center text-sm mt-4">
                    <span className="text-gray-400">Đã có tài khoản? </span>
                    <a
                        href={webRoutes.login}
                        className="text-primary-500 font-semibold"
                    >
                        Đăng nhập ngay
                    </a>
                </div>
            </Form>
        </Fragment>
    );
};

export default RegisterForm;
