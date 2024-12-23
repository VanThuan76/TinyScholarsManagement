import dayjs from 'dayjs';
import { Button, Form, DatePicker, Select, TimePicker, message } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRoutes } from '@/routes/api';
import { webRoutes } from '@/routes/web';
import { handleErrorResponse } from '@/lib/utils';
import { defaultHttp } from '@/lib/http';
import { Room } from '@/interfaces/room';
import { RootState } from '@/store';

interface FormValues {
    campusId: string;
    roomName: string;
    bookedDate: string;
    bookTimeFrom: string;
    bookTimeTo: string;
}

const BookingForm = ({ toggleBookingDrawer, initData }: { toggleBookingDrawer: () => void; initData?: { campusId?: string; campusName?: string } | null }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const children = useSelector((state: RootState) => state.client?.user?.children);

    useEffect(() => {
        defaultHttp
            .get(apiRoutes.rooms)
            .then((response) => {
                setRoomList(response.data.data);
            })
            .catch(handleErrorResponse);
    }, [form]);

    const onSubmit = (values: FormValues) => {
        const formData = {
            ...values,
            campusId: selectedRoom?.campus.id,
            roomName: selectedRoom?.roomName,
        };

        defaultHttp
            .post(apiRoutes.bookings, formData)
            .then(() => {
                message.success('Đặt lịch thành công!');
                form.resetFields();
                toggleBookingDrawer();
                navigate(webRoutes.home);
            })
            .catch((error) => {
                handleErrorResponse(error);
                setLoading(false);
            });
    };

    const handleRoomChange = (value: string) => {
        const selected = roomList.find(room => Number(room.id) === Number(value));
        setSelectedRoom(selected || null);
    };

    return (
        <Fragment>
            <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-2xl opacity-60 my-0">
                    Đặt lịch {initData ? initData.campusName : ''}
                </h3>
                <p className="text-sm text-gray-400">
                    Nhập thông tin để hoàn tất đặt lịch
                </p>
            </div>
            <Form
                className="space-y-4 md:space-y-6"
                form={form}
                name="booking-form"
                onFinish={onSubmit}
                layout={'vertical'}
                requiredMark={false}
            >
                <div>
                    <Form.Item
                        name="childId"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Chọn con
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn con',
                        }]}
                    >
                        <Select
                            placeholder="Chọn con"
                            className="bg-gray-50 text-gray-900 sm:text-sm"
                        >
                            {children && children.map((child) => (
                                <Select.Option key={child.id} value={child.id.toString()}>
                                    {child.firstName} {child.lastName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name="campusAndRoom"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Phòng {initData ? '' : '- Khuôn viên'}
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn khuôn viên',
                        }]}
                    >
                        <Select
                            placeholder="Chọn phòng"
                            className="bg-gray-50 text-gray-900 sm:text-sm"
                            onChange={handleRoomChange}
                        >
                            {(initData?.campusId
                                ? roomList.filter(room => Number(room.campus.id) === Number(initData.campusId))
                                : roomList
                            ).map((room) => (
                                <Select.Option key={room.id} value={room.id}>
                                    {room.roomName} {initData ? '' : `- ${room.campus.name}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        name="bookedDate"
                        label={
                            <p className="block text-sm font-medium text-gray-900">
                                Ngày đặt
                            </p>
                        }
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn ngày đặt',
                        }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Chọn ngày đặt"
                            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5 w-full"
                            disabledDate={(current) => current && current.isBefore(dayjs(), 'day')}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="bookTimeFrom"
                    label={
                        <p className="block text-sm font-medium text-gray-900">
                            Giờ bắt đầu
                        </p>
                    }
                    rules={[{
                        required: true,
                        message: 'Vui lòng chọn giờ bắt đầu',
                    }]}
                >
                    <TimePicker
                        format="HH:mm"
                        placeholder="Chọn giờ bắt đầu"
                        className="bg-gray-50 text-gray-900 sm:text-sm py-1.5 w-full"
                        disabledHours={() => {
                            const hours = [];
                            for (let i = 0; i < 8; i++) {
                                hours.push(i);
                            }
                            for (let i = 18; i < 24; i++) {
                                hours.push(i);
                            }
                            return hours;
                        }}
                        disabledMinutes={(current) => {
                            const currentHour = dayjs(current);
                            if (currentHour && (currentHour.hour() === 17)) {
                                return [...Array(60).keys()].slice(0, 1);
                            }
                            return [];
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="bookTimeTo"
                    label={
                        <p className="block text-sm font-medium text-gray-900">
                            Giờ kết thúc
                        </p>
                    }
                    rules={[{
                        required: true,
                        message: 'Vui lòng chọn giờ kết thúc',
                    }]}
                >
                    <TimePicker
                        format="HH:mm"
                        placeholder="Chọn giờ kết thúc"
                        className="bg-gray-50 text-gray-900 sm:text-sm py-1.5 w-full"
                        disabledHours={() => {
                            const hours = [];
                            for (let i = 0; i < 8; i++) {
                                hours.push(i);
                            }
                            for (let i = 18; i < 24; i++) {
                                hours.push(i);
                            }
                            return hours;
                        }}
                        disabledMinutes={(current) => {
                            const currentHour = dayjs(current);
                            if (currentHour && (currentHour.hour() === 17)) {
                                return [...Array(60).keys()].slice(0, 1);
                            }
                            return [];
                        }}
                    />
                </Form.Item>


                <div className="text-center">
                    <Button
                        className="mt-4"
                        block
                        loading={loading}
                        type="primary"
                        size="large"
                        htmlType={'submit'}
                    >
                        Đặt lịch
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default BookingForm;
