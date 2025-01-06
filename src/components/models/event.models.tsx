import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: any) => void;
  initialData?: any;
}

export const EventModal: React.FC<EventModalProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        date: initialData.date ? moment(initialData.date, 'DD/MM/YYYY') : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('DD/MM/YYYY') : null,
    };
    onSubmit(formattedValues);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={initialData ? 'Update Event' : 'Create Event'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
          <DatePicker showTime format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};