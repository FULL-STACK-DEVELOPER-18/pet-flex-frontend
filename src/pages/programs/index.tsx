import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { Button, Form, Input, InputNumber, Result, Spin, Table } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchProgramList, addProgram, editProgram } from '../../redux/slices/program-classes-library.slices';
import "./style.scss";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  programClassesName: string;
  weeks: number;
  _id?: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputNumberRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        {dataIndex === 'weeks' ? (
          <InputNumber 
            ref={inputNumberRef}
            onPressEnter={save} 
            onBlur={save}
            min={1}
            style={{ width: '100%' }}
          />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {dataIndex === 'weeks' ? `${String(children).replace(',', '')} Weeks` : children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const Programs = () => {
  const dispatch = useAppDispatch();
  const { programList, loading, error } = useSelector((state: RootState) => state.program);
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchProgramList());
  }, [dispatch]);

  const handleAdd = () => {
    const newData: Item = {
      key: `new-${count}`,
      programClassesName: `New Program`,
      weeks: 1
    };
    dispatch(addProgram({
      programClassesName: newData.programClassesName,
      weeks: newData.weeks
    }));
    setCount(count + 1);
  };

  const handleSave = async (row: Item) => {
    if (row._id) {
      // Existing record - update
      await dispatch(editProgram({
        id: row._id,
        programData: {
          programClassesName: row.programClassesName,
          weeks: Number(row.weeks)
        }
      }));
    } else {
      // New record - create
      await dispatch(addProgram({
        programClassesName: row.programClassesName,
        weeks: Number(row.weeks)
      }));
    }
  };

  const defaultColumns = [
    {
      title: 'Program / Classes',
      dataIndex: 'programClassesName',
      width: '60%',
      editable: true,
    },
    {
      title: 'Weeks',
      dataIndex: 'weeks',
      width: '40%',
      editable: true,
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

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
          onClick={handleAdd} 
          type="primary" 
          style={{ marginRight: 10 }}
        >
          Add New Program
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={programList.map(program => ({ 
          ...program, 
          key: program._id ?? `temp-${Date.now()}`
        }))}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />
    </div>
  );
};