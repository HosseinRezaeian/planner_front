import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get("user/profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("خطا در دریافت اطلاعات کاربر:", err));
  }, []);

  return (
    <div>
      <h1>پروفایل کاربری</h1>
      {user ? <p>نام: {user.name}</p> : <p>در حال بارگذاری...</p>}
    </div>
  );
};

export default Profile;
