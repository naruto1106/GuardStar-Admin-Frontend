import { setTeamlist } from "../reducer/TeamSlice";
import { APIURL } from "./contant";
import { toast } from "react-toastify";
import { setAuth } from "../reducer/AuthSlice";

export const getTeamlists = () => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/app/users/all`,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
       
        if (!response.ok) {
          throw new Error('Failed to categories');
        }
        const data = await response.json();
        dispatch(setTeamlist({ teamlist : data }))
      } catch (error) {
        // Dispatch failure action if there's an error
        console.log(error, 'error');
      }
    }
}

export const createTeam = (createData) => {
    return async () => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/app/users/create`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(createData)
          }
        );
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const data = await response.json();
        // Dispatch success action if the request is successful
        toast.success('Successfully created!');
        return data;
  
      } catch (error) {
        // Dispatch failure action if there's an error
        toast.error("Failed created");
      }
    }
}

export const SignIn = (loginData) => {
  return async (dispatch) => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/auth/login`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      let token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuth({ authentication: true }));
      }
      // Dispatch success action if the request is successful
      dispatch(setAuth({ auth: true, userInfo: data }));
      toast.success('Login successful!');
      return data;

    } catch (error) {
      toast.error("Username or password is not correct.");
    }
  }
}