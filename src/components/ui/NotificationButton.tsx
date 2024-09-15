import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        Performance Review
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        New Employee
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        Onboarding Today
      </a>
    ),
  },
];

const NotificationButton: React.FC = () => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom">
        <Badge count={3}>
          <Button icon={<BellOutlined />} shape="default" type="default" />
        </Badge>
      </Dropdown>
    </Space>
  </Space>
);

export default NotificationButton;
