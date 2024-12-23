import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Card, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ClientState } from "@/store/slices/clientSlice";
import { Child } from "@/interfaces/child";
import { login as loginClient } from '@/store/slices/clientSlice';
import ChildForm from "@/components/forms/childForm";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { User } from '@/interfaces/user';

const { Option } = Select;

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const client = useSelector((state: { client: ClientState }) => state.client);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        relationship: "",
        children: [],
    });
    const [children, setChildren] = useState<Child[]>(initialValues.children);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        if (client.user) {
            const updatedValues = {
                firstName: client.user.firstName ?? '',
                lastName: client.user.lastName ?? '',
                email: client.user.email ?? '',
                relationship: client.user.relationship ?? "",
                children: client.user.children ?? [],
            };
            setChildren(client.user.children);
            setInitialValues(updatedValues);

            form.setFieldsValue(updatedValues);
        }
    }, [client.user, form]);

    const handleSubmit = (values: any) => {
        alert("Thông tin đã được cập nhật!");
    };

    const handleAddChild = (child: Child) => {
        setChildren((prevChildren) => [...prevChildren, child]);
        http.get(`${apiRoutes.users}/id/${client.user?.id}`)
            .then(response => {
                const user: User = response.data
                dispatch(loginClient(user));
            })
    };

    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-2 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
                <Card className="w-full">
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Tên"
                            name="firstName"
                            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Nhập tên"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Họ"
                            name="lastName"
                            rules={[{ required: true, message: "Vui lòng nhập họ" }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Nhập họ"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: "Vui lòng nhập email hợp lệ" }]}
                        >
                            <Input placeholder="Nhập email" disabled />
                        </Form.Item>

                        <Form.Item
                            label="Mối quan hệ"
                            name="relationship"
                        >
                            <Select
                                placeholder="Chọn mối quan hệ"
                                allowClear
                            >
                                <Option value="father">Cha</Option>
                                <Option value="mother">Mẹ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Space className="flex justify-between w-full">
                                <Button type="default" onClick={() => navigate("/home")}>Quay lại</Button>
                                <Button type="primary" htmlType="submit">Cập nhật</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div className="w-full">
                <h3 className="text-xl font-medium">Thông tin các con</h3>
                <Card className="w-full">
                    {children.length > 0 ? (
                        children.map((child: Child, index) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                <h4 className="text-lg font-medium p-0 m-0">{child.firstName} {child.lastName}</h4>
                                <p className="text-sm text-gray-600">Giới tính: {child.gender === 'Male' ? 'Nam' : 'Nữ'}</p>
                                <p className="text-sm text-gray-600">Ngày sinh: {child.birthday}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Bạn chưa thêm thông tin về trẻ em.</p>
                    )}
                    <Button type="primary" onClick={toggleDrawer}>
                        Thêm con
                    </Button>
                </Card>
            </div>

            <Drawer
                title="Thêm thông tin trẻ em"
                width={720}
                onClose={toggleDrawer}
                visible={isDrawerVisible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <ChildForm
                    onSubmit={handleAddChild}
                    // @ts-ignore
                    defaultParent={client.user}
                />
            </Drawer>
        </div>
    );
};

export default ProfilePage;
