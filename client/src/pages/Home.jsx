import { useState } from "react"
import { Drawer, Button, Table } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import FormInputs from "../containers/FormInputs"
import BG from "../assets/images/bg.png"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
]

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
]

const Home = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const submitForm = (e) => {
    setVisible(false)
  }

  const onFinishFailed = (e) => {}
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  return (
    <div className="h-full" style={{ backgroundImage: `url(${BG})` }}>
      <Button type="primary" onClick={showDrawer} className="m-2">
        <PlusOutlined /> New account
      </Button>
      <Drawer
        title="Create a new account"
        width="100%"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <FormInputs onFinishFailed={onFinishFailed} submitForm={submitForm} />
      </Drawer>
      <div className="flex justify-center m-8 flex-flow">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          scroll={{ x: 300 }}
        />
      </div>
    </div>
  )
}
export default Home
