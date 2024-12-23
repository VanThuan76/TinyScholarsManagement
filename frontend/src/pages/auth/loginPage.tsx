import { Button, Form, Input, message } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { apiRoutes } from '@/routes/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/adminSlice';
import { login as loginClient } from '@/store/slices/clientSlice';
import { RootState } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web';
import { handleErrorResponse, setPageTitle } from '@/lib/utils';
import { defaultHttp } from '@/lib/http';
import { User } from '@/interfaces/user';

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
                const user: User = response.data.data

                if (user.role === 'ROLE_CLIENT') {
                    message.success('Đăng nhập thành công, chuyển hướng về trang chủ.');
                    dispatch(loginClient(user));
                    navigate("/", { replace: true });
                } else {
                    message.success('Đăng nhập thành công, chuyển hướng về trang quản trị.');
                    dispatch(login(user));
                    navigate("/admin/dashboard", { replace: true });
                }
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
                    Đăng nhập vào Happy Kids
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

                <div className="text-center text-sm mt-4">
                    <span className="text-gray-400">Chưa có tài khoản? </span>
                    <a
                        href={webRoutes.register}
                        className="text-primary-500 font-semibold"
                    >
                        Đăng ký ngay
                    </a>
                </div>
            </Form>
        </Fragment>
    );
};

export default LoginPage;
