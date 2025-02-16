import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Upload, Spin, Result, Space, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { addExercise, deleteExercise, getExerciseList, updateExercise } from '../../redux/slices/exercise.slice';
import { ExerciseData, Step } from '../../interfaces/exercise.interface';
import './style.scss';

type ModalAction = 'create' | 'edit' | 'delete' | 'view' | null;

export const Exercises = () => {
  const dispatch = useAppDispatch();
  const { exerciseList, loading, error } = useSelector((state: RootState) => state.exercise);
  const [modalAction, setModalAction] = useState<ModalAction>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getExerciseList());
  }, [dispatch]);

  const handleModalOpen = (action: ModalAction, exercise?: ExerciseData) => {
    setModalAction(action);
    setSelectedExercise(exercise || null);
    if (action === 'edit' && exercise) {
      form.setFieldsValue({
        ...exercise,
        steps: exercise.steps.map(step => ({
          ...step,
          stepImages: step.images ? step.images.map(img => ({ url: img })) : []
        }))
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setModalAction(null);
    setSelectedExercise(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('area', values.area);

      // Handle main image
      if (values.mainImage?.[0]?.originFileObj) {
        formData.append('mainImage', values.mainImage[0].originFileObj);
      }

      // Handle steps with images
      const steps = values.steps.map((step: any, index: number) => ({
        stepNumber: index + 1,
        description: step.description,
        images: []
      }));

      // Append step images
      values.steps.forEach((step: any, stepIndex: number) => {
        if (step.stepImages) {
          step.stepImages.forEach((file: any) => {
            if (file.originFileObj) {
              formData.append(`stepImages-${stepIndex}`, file.originFileObj);
              steps[stepIndex].images.push(`stepImages-${stepIndex}`);
            }
          });
        }
      });

      formData.append('steps', JSON.stringify(steps));

      if (modalAction === 'edit' && selectedExercise?._id) {
        await dispatch(updateExercise({
          id: selectedExercise._id,
          data: formData
        })).unwrap();
      } else {
        await dispatch(addExercise(formData)).unwrap();
      }
      handleModalClose();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedExercise?._id) {
      try {
        await dispatch(deleteExercise(selectedExercise._id)).unwrap();
        handleModalClose();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const columns = [
    {
      title: 'S:No',
      key: 'index',
      width: 80,
      render: (_: any, record: any, index: number) => (
        <div style={{ textAlign: 'center' }}>{String(index + 1).padStart(2, '0')}</div>
      ),
    },
    {
      title: 'Exercise',
      key: 'exercise',
      render: (_: any, record: ExerciseData) => (
        <Space>
          <img
            src={record.mainImage}
            alt={record.name}
            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Steps',
      key: 'steps',
      render: (_: any, record: ExerciseData) => (
        <Button type="link" onClick={() => handleModalOpen('view', record)}>
          View Steps ({record.steps.length})
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: ExerciseData) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => handleModalOpen('edit', record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => handleModalOpen('delete', record)}
          />
        </Space>
      ),
    },
  ];

  const renderStepsList = (steps: Step[]) => (
    <div className="steps-list">
      {steps.map((step, index) => (
        <Card key={index} className="step-card">
          <div className="step-header">
            <div className="step-number">{index + 1}</div>
            <p>{step.description}</p>
          </div>
          {step.images && step.images.length > 0 && (
            <div className="step-images">
              {step.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={`Step ${index + 1} image ${imgIndex + 1}`} />
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );

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
      <div className="table-btn">
        <Button
          type="primary"
          onClick={() => handleModalOpen('create')}
        >
          Add New Exercise
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={exerciseList}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          position: ['bottomCenter']
        }}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={modalAction === 'edit' ? 'Edit Exercise' : 'Add New Exercise'}
        open={modalAction === 'create' || modalAction === 'edit'}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Exercise Name"
            rules={[{ required: true, message: 'Please input exercise name!' }]}
          >
            <Input placeholder="Enter exercise name" />
          </Form.Item>

          <Form.Item
            name="area"
            label="Area"
            rules={[{ required: true, message: 'Please input area!' }]}
          >
            <Input placeholder="Enter area" />
          </Form.Item>

          <Form.Item
            name="mainImage"
            label="Main Image"
            rules={[{ required: true, message: 'Please upload main image!' }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.List
            name="steps"
            initialValue={[{ stepNumber: 1, description: '', images: [] }]}
          >
            {(fields, { add, remove }) => (
              <div className="steps-form">
                {fields.map((field, index) => (
                  <div key={field.key} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <Form.Item
                        {...field}
                        name={[field.name, 'description']}
                        rules={[{ required: true, message: 'Please input step description!' }]}
                      >
                        <Input.TextArea
                          rows={3}
                          placeholder="Enter step description"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'stepImages']}
                      >
                        <Upload
                          listType="picture-card"
                          maxCount={2}
                          beforeUpload={() => false}
                          accept="image/*"
                        >
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                      />
                    )}
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Step
                </Button>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              {modalAction === 'edit' ? 'Update Exercise' : 'Create Exercise'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Steps Modal */}
      <Modal
        title={`${selectedExercise?.name} - Steps`}
        open={modalAction === 'view'}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedExercise && renderStepsList(selectedExercise.steps)}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={modalAction === 'delete'}
        onOk={handleDelete}
        onCancel={handleModalClose}
      >
        <p>Are you sure you want to delete {selectedExercise?.name}?</p>
      </Modal>
    </div>
  );
};