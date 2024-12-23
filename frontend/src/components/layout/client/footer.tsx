import React from "react";
import { FacebookOutlined, InstagramOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { webRoutes } from "@/routes/web";

const FooterClient: React.FC = () => {
    return (
        <footer className="w-full bg-[#2e3d4e] text-white">
            <div className="container mx-auto py-16 px-6 grid gap-16 md:grid-cols-4">
                <div className="footer-brand">
                    <a href="#" className="text-white text-xl font-semibold">Tham Quan Mầm Non</a>
                    <p className="my-6 text-sm">
                        Chúng tôi mong muốn xây dựng một nền tảng giúp các em phát triển toàn diện về mặt trí tuệ, thể chất và tình cảm, trong không gian đầy niềm vui và yêu thương.
                    </p>
                    <div className="social-list flex gap-4">
                        <a
                            href="https://web.facebook.com/profile.php?id=100083138351633&_rdc=1&_rdr"
                            className="social-link w-12 h-12 flex justify-center items-center rounded-full bg-white text-[#2e3d4e] text-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookOutlined />
                        </a>
                        <a
                            href="https://www.instagram.com/arshmantuitioncentre/"
                            className="social-link w-12 h-12 flex justify-center items-center rounded-full bg-white text-[#2e3d4e] text-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramOutlined />
                        </a>
                    </div>
                </div>

                <div>
                    <p className="font-semibold mb-4">Khám phá</p>
                    <ul className="list-none p-0">
                        <li>
                            <a href={webRoutes.about} className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Về chúng tôi
                            </a>
                        </li>
                        <li>
                            <a href={webRoutes.campuses_client} className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Khuôn viên
                            </a>
                        </li>
                        <li>
                            <a href={webRoutes.reviews_client} className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Đánh giá
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Đăng lý Tham Quan
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mb-4">Liên kết hữu ích</p>
                    <ul className="list-none p-0">
                        <li>
                            <a href="#" className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Hồ sơ giảng viên
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Điều khoản & Điều kiện
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link flex items-center gap-2 py-2 text-white hover:text-blue-300">
                                <span className="icon">→</span>
                                Chính sách bảo mật
                            </a>
                        </li>
                    </ul>
                </div>


                <div>
                    <p className="font-semibold mb-4">Thông tin liên hệ</p>
                    <ul className="list-none p-0">
                        <li className="footer-item flex items-center gap-2 py-2">
                            <EnvironmentOutlined />
                            <span>Toà Tower, Hà Nội, Việt Nam</span>
                        </li>
                        <li className="footer-item flex items-center gap-2 py-2">
                            <PhoneOutlined />
                            <a href="tel:+923023207807" className="footer-link text-white hover:text-blue-300">
                                +84 33 262 8666
                            </a>
                        </li>
                        <li className="footer-item flex items-center gap-2 py-2">
                            <MailOutlined />
                            <a href="mailto:aisha111000khan@gmail.com" className="footer-link text-white hover:text-blue-300">
                                thuan@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom text-center py-4 bg-[#23303f]">
                <p className="text-sm">
                    Bản quyền © {new Date().getFullYear()} Tham quan mầm non. Mọi quyền được bảo lưu bởi{" "}
                    <a href="https://www.asharib.xyz/" target="_blank" className="text-blue-300 hover:text-[#005fae]">
                        Ẩn danh
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default FooterClient;
