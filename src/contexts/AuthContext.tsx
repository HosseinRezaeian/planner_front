import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import baseUrl from "../init";


interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    // console.log(accessToken);
    if (accessToken) {
      console.log("tf");
      try {
        
        const decoded: any = jwtDecode(accessToken);
        console.log("tf",decoded);
        console.log(decoded,"decoded")

        axios.get(baseUrl+`/account/profile/`, {
          headers: {
            'Authorization': 'Bearer '+accessToken,
          }
        })
        .then(response => {
            localStorage.setItem("username", response.data.username);
            // localStorage.setItem("refresh", response.data.refresh);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            console.log('Unauthorized! Logging out...');
            logout(); // Call your logout function
          }
        })
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("tf");

        console.error("توکن نامعتبر است", error);
        logout();
      }
    }
    else{
      setIsAuthenticated(false);
      logout();
    }
  }, []);


  const navigate = useNavigate();



  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/account/token/`, { username, password });
      console.log("✅ درخواست موفق:", response);
      // setIsAuthenticated(true);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      
      const decoded: any = jwtDecode(response.data.access);
      setUser(decoded);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      console.error("❌ خطای لاگین:", error);

      // حذف توکن‌های قبلی (در صورت وجود)
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      // بررسی وضعیت HTTP
      if (error.response) {
        if (error.response.status === 401) {
          alert("⚠️ نام کاربری یا رمز عبور اشتباه است.");
        } else {
          alert(`❌ خطای سرور: ${error.response.status}`);
        }
      } else {
        alert("❌ اتصال به سرور برقرار نشد.");
      }
    }
};


  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};