import './index.css';

import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Layout, List, Menu, theme as antTheme } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import ImageHero1 from '@/assets/images/img_hero_1.webp';
import ImageHero2 from '@/assets/images/img_hero_2.jpg';
import ImageHero3 from '@/assets/images/img_hero_3.jpg';
import Logo from '@/assets/logo/logo.png';

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const token = antTheme.useToken();

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: token.token.colorBgContainer }}>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src={Logo}
                width="200"
                height="150"
                loading="lazy"
                aria-hidden="true"
                style={{ marginTop: '-40px' }}
              />
            </Link>
          </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Trang chủ</Menu.Item>
            <Menu.Item key="2">Giới thiệu</Menu.Item>
            <Menu.Item key="3">Lợi ích</Menu.Item>
            <Menu.Item key="4">Lớp học</Menu.Item>
            <Menu.Item key="5">Trung tâm dạy kèm Arshaman</Menu.Item>
            <Menu.Item key="6">
              <a href="https://registration.neghs.site/" target="_blank" rel="noopener noreferrer">
                Đăng ký nhập học
              </a>
            </Menu.Item>
          </Menu>
          <div className="header-actions">
            <Button icon={<SearchOutlined />} />
            <Button icon={<UserOutlined />}>Liên hệ chúng tôi</Button>
            <Button icon={<MenuOutlined />} />
          </div>
        </div>
      </Header>

      <Content>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Mở khóa Giáo dục, Định hình Tương lai</h1>
              <p className="hero-text">
                Trường Trung học Anh ngữ Nouman được thành lập bởi cô Shammem Bano, nổi tiếng với tên gọi (Rip: Chanda
                Baji) vào năm 1985, và đã đào tạo hơn 10.000 học sinh từ khi bắt đầu cho đến nay dưới sự quản lý của
                Thầy Kashif Mumtaz Khan (Thạc sĩ Toán học).
              </p>
              <Button type="primary" size="large">
                <a href="https://www.instagram.com/arshmantuitioncentre/" target="_blank" rel="noopener noreferrer">
                  Xem hoạt động của trường
                </a>
              </Button>
            </div>
            <figure className="hero-banner">
              <img src={ImageHero1} width="500" height="500" loading="lazy" alt="hero image" className="w-100" />

              <img
                src={ImageHero2}
                width="318"
                height="352"
                loading="lazy"
                aria-hidden="true"
                className="abs-img abs-img-1"
              />

              <img
                src={ImageHero3}
                width="160"
                height="160"
                loading="lazy"
                aria-hidden="true"
                className="abs-img abs-img-2"
              />
            </figure>
          </div>
        </section>

        <section className="about">
          <div className="container">
            <h2>Chúng tôi cung cấp sự nghiệp tốt nhất</h2>
            <List
              className="about-list"
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'Giáo viên chuyên gia hàng đầu',
                  description: 'Chúng tôi có đội ngũ giáo viên giỏi nhất ở Nawabshah.',
                },
                {
                  title: 'Chương trình học cập nhật',
                  description: 'Chúng tôi theo dõi các khóa học tốt nhất từ cơ bản đến nâng cao.',
                },
                {
                  title: 'Cộng đồng học sinh tốt nhất',
                  description:
                    'Học sinh của trường chúng tôi là những người đứng đầu và lãnh đạo với tầm nhìn và sứ mệnh rộng lớn.',
                },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>
              )}
            />
          </div>
        </section>

        <section className="courses">
          <div className="container">
            <h2>Các khóa học phổ biến của chúng tôi</h2>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={[
                'Phát triển cá nhân',
                'Học Vật lý',
                'Nghệ thuật & Thiết kế',
                'Kỹ năng quản lý',
                'Học Hóa học',
                'Học Sinh học',
                'Học tiếng Sindhi',
                'Học Hồi giáo',
                'Sức khỏe & Lối sống',
              ]}
              renderItem={item => (
                <List.Item>
                  <Card title={item}>Khóa học tốt nhất trong lớp</Card>
                </List.Item>
              )}
            />
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Tham gia Trung tâm dạy kèm Arshaman của chúng tôi</h2>
            <p>
              Học từ những giáo viên có kinh nghiệm, những người bao quát các môn học của bạn và cho bạn con đường đến
              thành công, được quản lý bởi thầy Kashif Mumtaz Khan (cho nam sinh) và cô Aisha Musharaf Khan (cho nữ
              sinh).
            </p>
            <Button type="primary" size="large">
              <a href="tel:+923023207807">Liên hệ để đăng ký học kèm</a>
            </Button>
          </div>
        </section>
      </Content>

      <Footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="logo">
                Trường Nouman
              </Link>
              <p>
                Trường tốt nhất để dạy học sinh về giáo dục quan trọng của họ và trao quyền cho cuộc sống, tầm nhìn và
                năng suất tổng thể của họ với những giáo viên tuyệt vời.
              </p>
            </div>
            <ul className="footer-list">
              <li>
                <h3 className="footer-list-title">Khám phá</h3>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Sự kiện sắp tới
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Blog & Tin tức
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Đánh giá
                </Link>
              </li>
            </ul>
            <ul className="footer-list">
              <li>
                <h3 className="footer-list-title">Liên kết hữu ích</h3>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Hồ sơ giảng viên
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Khóa học phổ biến
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Điều khoản & Điều kiện
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p className="copyright">
              Bản quyền 2023 Trường Nouman. Đã đăng ký Bản quyền bởi
              <a href="https://www.asharib.xyz/" target="_blank" rel="noopener noreferrer">
                Asharib Ali
              </a>
            </p>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
