import React from "react";
import { Button, Table } from "antd";
import { Order } from "../data/Order";

const AntDesignRecursive = () => {
  const generateRows = (data) => {
    return data.map((item) => {
      const { child, ...rest } = item;
      const row = {
        ...rest,
        key: item.id,
      };

      if (child) {
        row.children = generateRows(child);
      }
      return row;
    });
  };

  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Order Type", dataIndex: "orderType", key: "orderType" },
    { title: "Specimen", dataIndex: "specimen", key: "specimen" },
    {
      key: "action",
      render: (record) => (
        <div>
          {record.orderType === "Test" && (
            <Button type="primary" onClick={() => console.log(record)}>
              View
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={generateRows(Order)}
        rowExpandable={(record) => record.child && record.child.length > 0}
      />
    </div>
  );
};

export default AntDesignRecursive;
