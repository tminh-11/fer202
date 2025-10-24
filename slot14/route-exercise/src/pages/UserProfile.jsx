import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  return (
    <div>
      <h2>👤 Hồ sơ người dùng</h2>
      <p>ID hiện tại: <strong>{id}</strong></p>
    </div>
  );
}
