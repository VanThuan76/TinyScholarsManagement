import React from "react";
import { Form, Input, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FiPhoneOutgoing } from "react-icons/fi";

import newsletterBg from '@/assets/img/newsletter-bg.jpg';

const NewsletterSection: React.FC = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { phone_number: string }) => {
        console.log("Số điện thoại đã gửi:", values.phone_number);
    };

    return (
        <section
            className="newsletter bg-cover bg-center text-center py-16"
            style={{ backgroundImage: `url(${newsletterBg})` }}
            id="admission"
            aria-label="newsletter"
        >
            <div className="container mx-auto px-4">
                <p className="text-lg text-black mb-4">
                    Đăng ký tham quan mầm non ngay (Happy Kids)
                </p>
                <h2 className="text-2xl text-black mb-8">
                    Chúng tôi sẽ liên hệ với bạn qua số điện thoại của bạn để cung cấp thêm thông tin
                </h2>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    action="https://formspree.io/f/xjvqrygn"
                    method="POST"
                    className="newsletter-form"
                >
                    <div className="relative mb-4">
                        <Form.Item
                            name="phone_number"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại của bạn!" },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: "Vui lòng nhập số điện thoại hợp lệ!",
                                },
                            ]}
                        >
                            <Input
                                type="tel"
                                placeholder="Nhập số điện thoại của bạn"
                                prefix={<FiPhoneOutgoing className="text-gray-500 pr-4" />}
                                className="email-field py-4 pl-12 pr-4 text-lg"
                            />
                        </Form.Item>
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<ArrowRightOutlined />}
                        className="btn-primary px-8 py-4 text-lg"
                    >
                        Liên hệ tham quan
                    </Button>
                </Form>
            </div>
        </section>
    );
};

export default NewsletterSection;
