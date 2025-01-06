import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface BlogModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (blog: any) => void;
  initialData?: any;
  isOpenModalAction: string;
}

export const BlogModal: React.FC<BlogModalProps> = ({ visible, onClose, onSubmit, initialData, isOpenModalAction }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title || '');
      formData.append('content', values.content || '');
      if (values.image && values.image.file) {
        formData.append('image', values.image.file);
      }
      formData.append('date', new Date().toISOString());
  
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isOpenModalAction === 'updateBlog' ? 'Update Blog' : 'Create Blog'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isOpenModalAction === 'updateBlog' ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};