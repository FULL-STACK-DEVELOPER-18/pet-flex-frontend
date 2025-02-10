// import React, { useContext, useEffect, useRef, useState } from 'react';
// import type { GetRef, InputRef, TableProps } from 'antd';
// import { Button, Form, Input, Table } from 'antd';

// type FormInstance<T> = GetRef<typeof Form<T>>;

// const EditableContext = React.createContext<FormInstance<any> | null>(null);

// interface Item {
//   key: string;
//   name: string;
//   age: string;
//   address: string;
// }

// interface EditableRowProps {
//   index: number;
// }

// const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// interface EditableCellProps {
//   title: React.ReactNode;
//   editable: boolean;
//   dataIndex: keyof Item;
//   record: Item;
//   handleSave: (record: Item) => void;
// }

// const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext)!;

//   useEffect(() => {
//     if (editing) {
//       inputRef.current?.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({ [dataIndex]: record[dataIndex] });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();

//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log('Save failed:', errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{ margin: 0 }}
//         name={dataIndex}
//         rules={[{ required: true, message: `${title} is required.` }]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{ paddingInlineEnd: 24 }}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };

// interface DataType {
//   key: React.Key;
//   programAndClasses: string;
//   weeks: string;
// }

// type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;


// export const Programs = () => {

//   const [dataSource, setDataSource] = useState<DataType[]>([
//     {
//         key: 1,
//         programAndClasses: "Dogy Day Care",
//         weeks: "02 Weeks"
//     },
//     {
//         key: 2,
//         programAndClasses: "Hoopers",
//         weeks: "04 Weeks"
//     },
//     {
//       key: 3,
//         programAndClasses: "Sniffer Training",
//         weeks: "06 Weeks"
//     }
// ]);

//   const columns = [
//     // {
//     //   title: 'S.No',
//     //   dataIndex: 'id',
//     //   key: 'id',
//     //   width: 100,
//     //   // render: (text: string, record: any, index: number) => (
//     //   //   <div style={{ textAlign: 'center' }}>{String(index + 1).padStart(2, '0')}</div>
//     //   // ),
//     // },
//     {
//       title: 'Program / Classes',
//       dataIndex: 'programAndClasses',
//       // key: 'programAndClasses',
//       editable: true
//     },
//     {
//       title: 'Weeks',
//       dataIndex: 'weeks',
//       // key: 'weeks',
//     },
//     // {
//     //   title: 'name',
//     //   dataIndex: 'name',
//     //   width: '30%',
//     //   editable: true,
//     // },
//     // {
//     //   title: 'age',
//     //   dataIndex: 'age',
//     // },
//     // {
//     //   title: 'address',
//     //   dataIndex: 'address',
//     // },
//   ];

// //   const programClassesList = [
// //     {
// //         "id": 1,
// //         "programAndClasses": "Dogy Day Care",
// //         "weeks": "02 Weeks"
// //     },
// //     {
// //         "id": 2,
// //         "programAndClasses": "Hoopers",
// //         "weeks": "04 Weeks"
// //     },
// //     {
// //         "id": 3,
// //         "programAndClasses": "Sniffer Training",
// //         "weeks": "06 Weeks"
// //     }
// // ]

// const components = {
//   body: {
//     row: EditableRow,
//     cell: EditableCell,
//   },
// };
  
//   return (
//     <div className="main-table">
//       <div className="table-btn">
//         <Button aria-label="Increment value" type="primary">Add New Program</Button>
//         <Button aria-label="Increment value" type="primary">Create</Button>
//       </div>
//         {/* <Table
//           columns={columns}
//           dataSource={programClassesList}
//           pagination={{ pageSize: 10 }}
//           rowKey="id"
//         /> */}
//         <Table<DataType>
//           components={components}
//           rowClassName={() => 'editable-row'}
//           bordered
//           dataSource={dataSource}
//           columns={columns as ColumnTypes}
//         />
//     </div>
//   )
// };


import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
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
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

export const Programs = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

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
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};
