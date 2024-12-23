import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import illustration from "@/assets/img/illustration.webp";
import illustration2 from "@/assets/img/illustration-2.avif";
import illus from "@/assets/img/illus.avif";
import icon1 from "@/assets/img/about-icon-1.png";
import icon2 from "@/assets/img/about-icon-2.png";
import icon3 from "@/assets/img/about-icon-3.png";

const AboutSection: React.FC = () => {
    return (
        <section className="py-0" id="about" aria-label="about">
            <div className="container flex flex-col md:flex-row justify-center items-center mx-auto">
                <figure className="relative bg-light-gray max-w-max aspect-[450/590] mb-10 order-2 md:order-1">
                    <img
                        src={illustration}
                        width={450}
                        height={590}
                        loading="lazy"
                        alt="about banner"
                        className="rounded-lg"
                    />

                    <img
                        src={illustration2}
                        width={188}
                        height={242}
                        loading="lazy"
                        aria-hidden="true"
                        className="absolute top-0 left-0"
                    />

                    <img
                        src={illus}
                        width={150}
                        height={200}
                        loading="lazy"
                        aria-hidden="true"
                        className="absolute bottom-0 right-0"
                    />
                </figure>

                <div className="text-center order-1 md:order-2 flex flex-col justify-center items-center">
                    <p className="text-lg text-gray-500 mb-4">Chúng tôi là ai</p>

                    <h2 className="text-2xl font-semibold m-0">Chúng tôi cung cấp trải nghiệm tốt nhất</h2>

                    <ul className="my-5 mx-auto max-w-4xl space-y-8">
                        <li className="flex items-center justify-start gap-6">
                            <div className="p-4 rounded-full bg-orange-300">
                                <img
                                    src={icon1}
                                    width={30}
                                    height={30}
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                <h3 className="font-medium text-lg">Đặt lịch tham quan dễ dàng</h3>
                                <p className="font-medium text-gray-600 text-left">
                                    Chúng tôi cung cấp hệ thống đặt lịch tham quan mầm non đơn giản và nhanh chóng, giúp phụ huynh có thể chọn thời gian phù hợp.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-center justify-start gap-6">
                            <div className="p-4 rounded-full bg-blue-500">
                                <img
                                    src={icon2}
                                    width={30}
                                    height={30}
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                <h3 className="font-medium text-lg">Tham quan môi khuôn viên tập chất lượng</h3>
                                <p className="font-medium text-gray-600 text-left">
                                    Các phụ huynh có thể tham quan trực tiếp môi khuôn viên tập, cơ sở vật chất và phương pháp giáo dục tại các trường mầm non.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-center justify-start gap-6">
                            <div className="p-4 rounded-full bg-red-300">
                                <img
                                    src={icon3}
                                    width={30}
                                    height={30}
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                <h3 className="font-medium text-lg">Hỗ trợ tư vấn chi tiết cho phụ huynh</h3>
                                <p className="font-medium text-gray-600 text-left">
                                    Chúng tôi cung cấp các dịch vụ tư vấn miễn phí, giúp phụ huynh lựa chọn trường mầm non phù hợp nhất cho con em mình.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <Button
                        type="primary"
                        href="https://www.facebook.com/profile.php?id=100083138351633"
                        target="_blank"
                        className="text-lg no-underline flex gap-2 py-2 px-8 w-fit md:w-full justify-center items-center"
                    >
                        <span>Biết thêm về chúng tôi</span>
                        <ArrowRightOutlined />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
