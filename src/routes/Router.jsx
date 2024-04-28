import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Home from "../pages/Home";
import Open from "../pages/Open";
import Close from "../pages/Close";
import Temperatures from "../pages/Temperatures";
import Team from "../pages/Team";
import Information from "../pages/Information";
import Incidents from "../pages/Incidents";
import Reports from "../pages/Reports";
import Allergy from "../pages/Allergy";
import Settings from "../pages/Settings";
import MainLayout from "../layouts/MainLayout";
import AddTeam from "../pages/AddTeam";
import Alert from "../pages/Alert";
import Login from "../pages/login";
import AddChecklist from "../pages/AddChecklist";
import { getAuthentication, setAuth } from "../reducer/AuthSlice";
import { useState, useEffect } from "react";
import EditChecklist from "../pages/EditChecklist";


const Router = () => {
    const dispatch = useDispatch();
    const authentication = useSelector(getAuthentication);
    // let token = localStorage.getItem("token");
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        if (token) {
            dispatch(setAuth({ authentication: true }));
        }
    }, [authentication]);

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    token ? <Navigate to="/home" /> : <Login />
                }
            />
            <Route
                path="/"
                element={
                    token ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
            />
            <Route
                path="/home"
                element={
                    token ? (
                        <MainLayout layout="home">
                            <Home />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/open"
                element={
                    token ? (
                        <MainLayout layout="open">
                            <Open />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/addchecklist"
                element={
                    token ? (
                        <MainLayout layout="open">
                            <AddChecklist />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/editchecklist/:checkType/:id"
                element={
                    token ? (
                        <MainLayout layout="">
                            <EditChecklist />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/close"
                element={
                    token ? (
                        <MainLayout layout="close">
                            <Close />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/temperatures"
                element={
                    token ? (
                        <MainLayout layout="temperatures">
                            <Temperatures />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/alert"
                element={
                    token ? (
                        <MainLayout layout="temperatures">
                            <Alert />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/team"
                element={
                    token ? (
                        <MainLayout layout="team">
                            <Team />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/addteam"
                element={
                    token ? (
                        <MainLayout layout="team">
                            <AddTeam />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/information"
                element={
                    token ? (
                        <MainLayout layout="information">
                            <Information />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/incidents"
                element={
                    token ? (
                        <MainLayout layout="incidents">
                            <Incidents />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/reports"
                element={
                    token ? (
                        <MainLayout layout="reports">
                            <Reports />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/allergy"
                element={
                    token ? (
                        <MainLayout layout="allergy">
                            <Allergy />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />
            <Route
                path="/settings"
                element={
                    token ? (
                        <MainLayout layout="settings">
                            <Settings />
                        </MainLayout>
                    ) : (<Navigate to="/login" />)
                }
            />



        </Routes>
    )
}

export default Router;