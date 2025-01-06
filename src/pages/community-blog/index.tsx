import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Button, Result, Modal, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { createBlog, deleteBlog, getBlogList, updateBlog } from '../../redux/slices/blogs.slices';
import { useNavigate } from 'react-router-dom';
import { BlogModal } from '../../components/models/blog.models';
import './style.scss';

export type BlogAction = 'addBlog' | 'updateBlog' | 'deleteBlog' | 'default' | 'viewBlog';

export interface BlogFormData {
  _id: string;
  key?: string;
  title: string;
  content: string;
  image: string[];
  date?: string;
}

export const CommunityBlog: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { blogList, loading, error } = useSelector((state: RootState) => state.blogs);
  const [isOpenModalAction, setIsOpenModalAction] =useState<BlogAction>('default');
  const [viewBlogData, setViewBlogData] = useState<BlogFormData | null>(null);
  const initalBlogForm = {
    title: '',
    content: '',
    image: [],
    _id: '',
  };
  const [blogForm, setBlogForm] = useState<BlogFormData>(initalBlogForm);

  useEffect(() => {
    dispatch(getBlogList());
  }, [dispatch]);

  const onClickOpenModalAction = async (action: BlogAction, data?: any) => {
    setIsOpenModalAction(action);
    setBlogForm(initalBlogForm);
    switch (action) {
      case 'deleteBlog':
      case 'updateBlog':
        setBlogForm(data)
        setViewBlogData(data);
        break;
      case 'viewBlog':
        setViewBlogData(data);
        break;
      default:
        break;
    }
  };

  const onClickDispatchAction = async (action: BlogAction, data: BlogFormData) => {
    switch (action) {
      case 'deleteBlog':
        try {
          await dispatch(deleteBlog(data._id)).unwrap();
          setIsOpenModalAction('default');
        } catch (error) {
          console.error('Failed to delete blog:', error);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (data: BlogFormData) => {
    try {
      if (isOpenModalAction === 'updateBlog') {
        const blogId = viewBlogData?._id ?? '';
        await dispatch(updateBlog({ id: blogId, blogData: data })).unwrap();
      } else {
        await dispatch(createBlog(data as any)).unwrap();
      }
      setIsOpenModalAction('default');
    } catch (error) {
      console.error('Failed to submit blog:', error);
    }
  };

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
      />
    )
  }

  return (
    <div className="main-table">
      <div className="table-btn">
        <Button aria-label="Increment value" type="primary" onClick={() => onClickOpenModalAction('addBlog')}>Create</Button>
      </div>
      <Row gutter={[16, 16]}>
        {blogList.length > 0 ? (
          blogList.map((blog, index) => (
            blog ? (
              <Col xs={24} sm={12} md={12} lg={12} key={index}>
                <Card
                  loading={loading}
                  actions={[
                    <EditOutlined key="edit" onClick={() => onClickOpenModalAction('updateBlog', blog)} />,
                    <DeleteOutlined key="delete" onClick={() => onClickOpenModalAction('deleteBlog', blog)} />,
                    <EyeOutlined key="view" onClick={() => onClickOpenModalAction('viewBlog', blog)} />
                  ]}
                  style={{ minWidth: 300 }}
                >
                  <Card.Meta
                    avatar={<Avatar src={blog?.image} className="custom-avatar" />}
                    title={<div className="card-title">{blog.title || 'Untitled'}</div>}
                    description={
                      <>
                        <div className="card-description">
                          <p>{blog.content || 'No content available'}</p>
                        </div>
                        <p className="card-date">{blog.date || 'No date available'}</p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ) : null
          ))
        ) : (
          <Col span={24}>
            <Empty description="No Blogs Available" />
          </Col>
        )}
      </Row>
      <BlogModal
        visible={isOpenModalAction === 'addBlog' || isOpenModalAction === 'updateBlog'}
        onClose={() => setIsOpenModalAction('default')}
        onSubmit={handleSubmit}
        initialData={blogForm}
        isOpenModalAction={isOpenModalAction}
      />
      <Modal
        title="Confirm Delete"
        open={isOpenModalAction === 'deleteBlog'}
        onOk={() => onClickDispatchAction(isOpenModalAction, blogForm)}
        onCancel={() => setIsOpenModalAction('default')}
      >
        <p>Are you sure you want to delete {blogForm.title}?</p>
      </Modal>

      <Modal
        title="Blog Details"
        open={isOpenModalAction === "viewBlog"}
        onCancel={() => setIsOpenModalAction('default')}
        footer={null}
        width={800} 
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Avatar src={viewBlogData?.image} className="custom-avatar" size={100} />
          <div style={{ marginLeft: '20px', maxWidth: '600px' }}>
            <h2>{viewBlogData?.title || 'Untitled'}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{viewBlogData?.content}</p>
            <p className="card-date">{viewBlogData?.date || 'No date available'}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};