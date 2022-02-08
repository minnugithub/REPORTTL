import React from "react";
import "./Table.css";
import "antd/dist/antd.css";
import { Table, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Tabledetails() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUser();
  }, []);
  let { uid } = useParams();

  function getUser() {
    setLoading(true);
    fetch(`http://localhost:3001/tasks/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deleteTask(taskid) {
    fetch(`http://localhost:3001/tasks/${taskid}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUser();
      });
    });
  }

  const columns = [
    {
      key: "1",
      title: "Task Name",
      dataIndex: "taskname",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder='Type text here'
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type='primary'>
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type='danger'>
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.taskname.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Task ID",
      dataIndex: "taskid",
      // sorter: (record1, record2) => {
      //   return record1.taskid > record2.taskid;
      // },
    },
    {
      key: "3",
      title: "Task Description",
      dataIndex: "taskdescription",
    },

    {
      key: "4",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "5",
      title: "view task",

      render: () => {
        return (
          <>
            <button>view </button>
          </>
        );
      },
    },
    {
      key: "6",
      title: "Approval",
      dataIndex: "approval",
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            {console.log(record)}
            <button onClick={() => deleteTask(record.taskid)}>delete </button>
          </>
        );
      },
    },
  ];

  return (
    <div className='table'>
      <Link to={`./addTask/${uid}`}>
        <button className='addtask'>Add New Task</button>
      </Link>

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}></Table>
    </div>
  );
}
