import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AboutSection from "@/components/client/aboutSection";

const AboutPage: React.FC = () => {
    return (
        <div className="w-full bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <AboutSection />
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Về Chúng Tôi</h1>
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chúng tôi là ai?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Chúng tôi là một công ty chuyên cung cấp dịch vụ tham quan và tư vấn trường mầm non cho các bậc phụ huynh.
                        Sứ mệnh của chúng tôi là giúp các bậc phụ huynh tìm kiếm và lựa chọn được môi trường học tập tốt nhất cho con cái.
                        Chúng tôi tự hào về đội ngũ nhân viên giàu kinh nghiệm và tận tâm, luôn sẵn sàng hỗ trợ và chia sẻ thông tin bổ ích.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sứ Mệnh & Tầm Nhìn</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Sứ mệnh của chúng tôi là giúp các phụ huynh dễ dàng tiếp cận thông tin, từ đó có thể đưa ra những quyết định sáng suốt nhất về việc chọn trường cho con.
                        Tầm nhìn của chúng tôi là trở thành nền tảng tư vấn và tham quan mầm non hàng đầu, giúp xây dựng những mối quan hệ bền vững giữa phụ huynh và các trường mầm non.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thông Tin Liên Hệ</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Nếu bạn có bất kỳ câu hỏi nào hoặc muốn biết thêm chi tiết về các dịch vụ của chúng tôi, đừng ngần ngại liên hệ với chúng tôi qua các kênh sau:
                    </p>
                    <ul className="list-none space-y-4">
                        <li className="flex items-center justify-center gap-2 text-lg text-gray-700">
                            <span className="font-semibold">Email:</span> <a href="mailto:info@company.com" className="text-blue-600">info@company.com</a>
                        </li>
                        <li className="flex items-center justify-center gap-2 text-lg text-gray-700">
                            <span className="font-semibold">Điện thoại:</span> <span className="text-blue-600">+84 123 456 789</span>
                        </li>
                        <li className="flex items-center justify-center gap-2 text-lg text-gray-700">
                            <span className="font-semibold">Địa chỉ:</span> <span className="text-blue-600">123 Đường ABC, Thành phố XYZ, Việt Nam</span>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Đội Ngũ Chuyên Nghiệp</h2>
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="w-full sm:w-1/2 md:w-1/3 text-center">
                            <img
                                src="/path-to-image/ceo.jpg"
                                alt="CEO"
                                className="rounded-full w-32 h-32 mx-auto mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800">Nguyễn Văn A</h3>
                            <p className="text-gray-600">Giám đốc điều hành</p>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 text-center">
                            <img
                                src="/path-to-image/manager.jpg"
                                alt="Manager"
                                className="rounded-full w-32 h-32 mx-auto mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800">Trần Thị B</h3>
                            <p className="text-gray-600">Quản lý dịch vụ khách hàng</p>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 text-center">
                            <img
                                src="/path-to-image/consultant.jpg"
                                alt="Consultant"
                                className="rounded-full w-32 h-32 mx-auto mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800">Lê Thị C</h3>
                            <p className="text-gray-600">Chuyên viên tư vấn</p>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        href="https://www.facebook.com/profile.php?id=100083138351633"
                        target="_blank"
                        className="text-lg no-underline flex gap-2 py-2 px-8 w-fit justify-center items-center mx-auto"
                    >
                        <span>Biết thêm về chúng tôi</span>
                        <ArrowRightOutlined />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
