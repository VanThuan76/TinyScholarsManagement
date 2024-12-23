import React from "react";
import VideoIntro from "@/assets/video/intro.mp4";

const BannerSection: React.FC = () => {
    return (
        <section className="relative w-full h-[500px]" aria-label="banner">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
            >
                <source src={VideoIntro} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Khám Phá Sự Nghiệp Tương Lai Cùng Chúng Tôi</h2>
                <p className="text-lg font-semibold">Hãy gia nhập chúng tôi và bắt đầu hành trình nghề nghiệp tuyệt vời.</p>
            </div>
        </section>
    );
};

export default BannerSection;
