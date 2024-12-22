import { Button, Form, Input, message } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { apiRoutes } from '@/routes/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/adminSlice';
import { RootState } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web';
import { handleErrorResponse, setPageTitle } from '@/lib/utils';
import { Admin } from '@/interfaces/admin';
import { defaultHttp } from '@/lib/http';

interface FormValues {
    username: string;
    password: string;
}

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || webRoutes.dashboard;
    const admin = useSelector((state: RootState) => state.admin);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setPageTitle(`Admin Login - ${CONFIG.appName}`);
    }, []);

    useEffect(() => {
        if (admin) {
            navigate(from, { replace: true });
        }
    }, [admin]);

    const onSubmit = (values: FormValues) => {
        setLoading(true);

        defaultHttp
            .post(apiRoutes.login, {
                username: values.username,
                password: values.password,
            })
            .then((response) => {
                const admin: Admin = response.data.data

                if (admin.role === 'ROLE_CLIENT') {
                    message.error('Bạn không có quyền truy cập vào trang này.');
                    setLoading(false);
                    return;
                }

                dispatch(login(admin));
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
                    Đăng nhập hệ thống
                </h3>
                <p className="text-sm text-gray-400">
                    Nhập tài khoản của bạn để truy cập hệ thống
                </p>
            </div>
            <Form
                className="space-y-4 md:space-y-6"
                form={form}
                name="login"
                onFinish={onSubmit}
                layout={'vertical'}
                requiredMark={false}
                initialValues={
                    import.meta.env.VITE_DEMO_MODE === 'true'
                        ? {
                            email: 'demo@example.com',
                            password: 'password',
                        }
                        : {}
                }
            >
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
                            }
                        ]}
                    >
                        <Input
                            placeholder="giaovien_truongA"
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

                <div className="text-center">
                    <Button
                        className="mt-4"
                        block
                        loading={loading}
                        type="primary"
                        size="large"
                        htmlType={'submit'}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default LoginPage;
