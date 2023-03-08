import Image from "next/image";
import { FC, useState } from "react";
import styles from "./UserCard.module.css";
import {
  DeleteFilled,
  EditOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, Modal } from "antd";
import { Like } from "@/component/like/Like";
import { createPortal } from "react-dom";
const { Meta } = Card;

interface UserCardProps {
  user: User;
  updateUser: (user: User) => void;
  deleteUser: (user: User) => void;
}
const UserCard: FC<UserCardProps> = ({ user, updateUser, deleteUser }) => {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      await form.validateFields();
      user = {
        ...user,
        name: form.getFieldValue("name"),
        email: form.getFieldValue("email"),
        phone: form.getFieldValue("phone"),
        website: form.getFieldValue("website"),
      };
      setEditProfile(false);
      updateUser(user);
    } catch (e) {
      // logger for errors
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditProfile(false);
  };

  return (
    <>
      <Card
        className={styles["card"]}
        cover={
          <div className={styles["card-img-wrapper"]}>
            <Image
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              alt={user.name + " profile image"}
              fill={true}
              style={{ objectFit: "contain" }}
              // priority can be set conditionally based on device height for better LCP
              priority={true}
            />
          </div>
        }
        bordered={true}
        actions={[
          <Like key="like" size={20} />,
          <EditOutlined
            style={{ fontSize: 18 }}
            key="edit"
            onClick={() => setEditProfile(true)}
          />,
          <DeleteFilled
            style={{ fontSize: 18 }}
            key="delete"
            onClick={() => deleteUser(user)}
          />,
        ]}
      >
        <h3 className={styles["name"]}>{user.name}</h3>
        <Meta
          avatar={<MailOutlined style={{ fontSize: 18 }} />}
          description={user.email}
        />
        <Meta
          avatar={<PhoneOutlined style={{ fontSize: 18 }} />}
          description={user.phone}
        />
        <Meta
          avatar={<GlobalOutlined style={{ fontSize: 18 }} />}
          description={"http://" + user.website}
        />
      </Card>

      {/* show modal when profile is being edited */}
      {editProfile &&
        createPortal(
          <Modal
            title="Basic Modal"
            open={true}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
              wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "This field is required" }]}
                initialValue={user.name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                  {
                    type: "email",
                    message: "Invalid email",
                  },
                ]}
                initialValue={user.email}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                initialValue={user.phone}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="website"
                label="Website"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                initialValue={user.website}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default UserCard;
