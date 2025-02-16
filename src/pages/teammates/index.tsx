import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Radio, Spin, Result, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { addTeammate, editTeammate, getTeammateList, removeTeammate } from '../../redux/slices/teammates.slices';
import { TeammateData } from '../../interfaces/teammate.interface';
import teamImage from '../../assets/png-images/teammates-page-icon.png';
import './style.scss';

type ModalAction = 'create' | 'edit' | 'delete' | null;

export const Teammates = () => {
  const dispatch = useAppDispatch();
  const { teammateList, loading, error } = useSelector((state: RootState) => state.teammates);
  const [modalAction, setModalAction] = useState<ModalAction>(null);
  const [selectedTeammate, setSelectedTeammate] = useState<TeammateData | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getTeammateList());
  }, [dispatch]);

  const handleModalOpen = (action: ModalAction, teammate?: TeammateData) => {
    setModalAction(action);
    setSelectedTeammate(teammate || null);
    if (action === 'edit' && teammate) {
      form.setFieldsValue(teammate);
    } else {
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setModalAction(null);
    setSelectedTeammate(null);
    form.resetFields();
  };

  const handleSubmit = async (values: TeammateData) => {
    try {
      if (modalAction === 'edit' && selectedTeammate?._id) {
        await dispatch(editTeammate({
          id: selectedTeammate._id,
          teammateData: values
        })).unwrap();
      } else {
        await dispatch(addTeammate(values)).unwrap();
      }
      handleModalClose();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedTeammate?._id) {
      try {
        await dispatch(removeTeammate(selectedTeammate._id)).unwrap();
        handleModalClose();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: TeammateData) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Invite Link',
      dataIndex: 'inviteLink',
      key: 'inviteLink',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '120px',
      render: (_: any, record: TeammateData) => (
        <Space style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="text"
            icon={<EditOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => handleModalOpen('edit', record)}
            style={{ padding: '4px 8px', height: 'auto' }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => handleModalOpen('delete', record)}
            style={{ padding: '4px 8px', height: 'auto' }}
          />
        </Space>
      ),
      align: 'center' as const,
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return (
    <div className="main-table">
      <div className="team-header">
        <div className="team-info">
          <h1>TEAM</h1>
          <h2>Work Together To Create A Stronger Team.</h2>
          <p>Invite others To Collaborate & Work Together To Improve Your Clients Outcomes.</p>
        </div>
        <div className="team-image">
          <img src={teamImage} alt="Team Illustration" />
        </div>
      </div>

      <div className="table-btn">
        <Button
          type="primary"
          onClick={() => handleModalOpen('create')}
        >
          Create
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={teammateList}
        rowKey="_id"
        pagination={{ 
          pageSize: 3 ,
          position: ['bottomCenter']
        }}
      />

      <Modal
        title={modalAction === 'edit' ? 'Edit Teammate' : 'Invites Member To Patflex'}
        open={modalAction === 'create' || modalAction === 'edit'}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Type here" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Radio.Group>
              <Radio value="Admin">Admin</Radio>
              <Radio value="Trainer">Trainer</Radio>
              <Radio value="UET">UET</Radio>
              <Radio value="Nutsiutest">Nutsiutest</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
            initialValue="Active"
          >
            <Radio.Group>
              <Radio value="Active">Active</Radio>
              <Radio value="Inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="invite-button">
              {modalAction === 'edit' ? 'Update' : 'Invite Now'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={modalAction === 'delete'}
        onOk={handleDelete}
        onCancel={handleModalClose}
      >
        <p>Are you sure you want to delete {selectedTeammate?.firstName} {selectedTeammate?.lastName}?</p>
      </Modal>
    </div>
  );
};