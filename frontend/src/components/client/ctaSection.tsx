import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ctaBg from '@/assets/img/cta-bg.png';
import ctaBanner from '@/assets/img/9.webp';

const CTASection: React.FC = () => {
    return (
        <section
            className="bg-cover bg-center text-center py-16 bg-indigo-500"
            style={{ backgroundImage: `url(${ctaBg})` }}
            id="tuition"
            aria-label="workshop"
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="w-full flex flex-col justify-start items-start">
                    <p className="text-xl md:text-2xl text-white font-bold">
                        Tham quan mầm non Happy Kids
                    </p>

                    <h2 className="text-2xl md:text-4xl text-white text-left">
                        Tham gia Ban quản lý Happy Kids
                    </h2>

                    <p className="text-white mb-8 text-left">
                        Học hỏi trong môi trường mầm non chất lượng, nơi các em được chăm sóc và phát triển toàn diện. Dưới sự quản lý tận tâm của đội ngũ ban quản lý, chúng tôi cam kết mang đến một không gian học tập an toàn, sáng tạo và đầy niềm vui, giúp các bé phát triển về trí tuệ, thể chất và cảm xúc, chuẩn bị hành trang vững chắc cho tương lai.
                    </p>

                    <Button
                        type="primary"
                        href="tel:+3333333333"
                        target="_blank"
                        className="btn-secondary no-underline px-8 py-4 text-lg flex items-center gap-2"
                    >
                        <span>Liên hệ để trở thành giáo viên</span>
                        <ArrowRightOutlined />
                    </Button>
                </div>

                <figure className="w-full h-auto">
                    <img
                        src={ctaBanner}
                        alt="cta banner"
                        className="w-full h-auto object-cover rounded-md"
                        width={580}
                        height={380}
                        loading="lazy"
                    />
                </figure>
            </div>
        </section>
    );
};

export default CTASection;
