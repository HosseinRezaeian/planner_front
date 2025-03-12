import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import baseUrl from "../init";
import { useDispatch } from "react-redux";
import { apinoteSlice } from "../features/NoteFolderApi";
import store from "../store/store";
import { useLocalStorage } from "@mantine/hooks";


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


  const [username, setUsername] = useLocalStorage({
    key: 'username',
    defaultValue: "",
});

  const getProfile = (accesstoken: string) => {



    axios.get(baseUrl + `/api/account/profile/`, {
      headers: {
        'Authorization': 'Bearer ' + accesstoken,
      }
    })
      .then(response => {
        setUsername( response.data.username);


        localStorage.setItem("spaces", JSON.stringify(response.data.places));
        console.log("pll", response.data.places);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized! Logging out...');
          logout();
        }
      })
    // setUser(decoded);
    setIsAuthenticated(true);
  }



  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      console.log("tf");
      try {
        getProfile(accessToken);

      } catch (error) {
        console.error("توکن نامعتبر است", error);
        logout();
      }
    }
    else {
      setIsAuthenticated(false);
      logout();
    }
  }, []);


  const navigate = useNavigate();

 
  
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/api/account/token/`, { username, password });
      console.log("✅ درخواست موفق:", response);


      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);



      const decoded: any = jwtDecode(response.data.access);
      getProfile(response.data.access);
      setUser(decoded);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      console.error("❌ خطای لاگین:", error);


      localStorage.removeItem("access");
      localStorage.removeItem("refresh");


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

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // dispatch(apinoteSlice.util.resetApiState());
    store.dispatch({ type: 'LOGOUT' });
    // dispatch(logout());
    // window.location.reload();


    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("spaces");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};