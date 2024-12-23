import { Tabs, message } from 'antd';
import { Fragment, useState } from 'react'

import ChildRegisterForm from '@/components/forms/childRegisterForm';
import RegisterForm from '@/components/forms/registerForm';;

const RegisterPage = () => {
    const [activeTab, setActiveTab] = useState<string>('1');
    const [userId, setUserId] = useState<number | null>(null);

    const handleRegisterSuccess = (createdUserId: number) => {
        setUserId(createdUserId);
        setActiveTab('2');
        message.success('Đăng ký tài khoản thành công! Vui lòng nhập thông tin con em.');
    };

    return (
        <Fragment>
            <div className="flex flex-col space-y-4">
                <Tabs
                    activeKey={activeTab}
                    onChange={(key) => setActiveTab(key)}
                >
                    <Tabs.TabPane tab="Đăng ký tài khoản" key="1">
                        <RegisterForm onSuccess={handleRegisterSuccess} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đăng ký con em" key="2" disabled={!userId}>
                        {userId && <ChildRegisterForm userId={userId} />}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Fragment>
    );
};

export default RegisterPage;
