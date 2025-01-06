import React, { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getClientPetList } from '../../redux/slices/clients-pets.slice';
import { useAppDispatch } from '../../redux/hooks';
import { Button, Result, Spin, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const ClientPets: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clientPetList, loading, error } = useSelector((state: RootState) => state.clientsPets);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClientPetList());
  }, [dispatch]);

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Pet Name',
      dataIndex: 'petName',
      key: 'petName',
    },
  ];

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    )
  }

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
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={clientPetList}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      )} 
    </div>
  );
};