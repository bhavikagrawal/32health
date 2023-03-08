import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { CSSProperties, FC, useState } from "react";

interface LikeProps {
  size?: number;
}
export const Like: FC<LikeProps> = ({ size }) => {
  const [like, setLike] = useState<boolean>(false);
  const Component = like ? HeartFilled : HeartOutlined;
  const style: CSSProperties | undefined = { color: "red" };
  if (size) style.fontSize = size;
  return <Component onClick={() => setLike(!like)} style={style} />;
};
