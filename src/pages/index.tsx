import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Col, Row } from "antd";
import { Loader } from "@/component/loader/Loader";

const UserCard = dynamic(
  () => import("@/component/card/userprofile/UserCard"),
  { ssr: false }
);

export default function Home() {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users: User[] = await res.json();
      setUsers(users);
      setLoading(false);
    })();
  }, []);

  const onEditComplete = (user: User) => {
    setUsers(
      users?.map((usr) => {
        return usr.id === user.id ? user : usr;
      })
    );
  };
  const onDelete = (user: User) => {
    setUsers(
      users?.filter((usr) => {
        return usr.id !== user.id;
      })
    );
  };

  if (loading) return <Loader />;
  return (
    <>
      <Head>
        <title>User Profiles</title>
        <meta name="description" content="User Profiles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        {users?.map((user) => (
          <Col key={user.id} xs={24} sm={24} md={8} lg={8} xl={6}>
            <UserCard
              user={user}
              updateUser={onEditComplete}
              deleteUser={onDelete}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
