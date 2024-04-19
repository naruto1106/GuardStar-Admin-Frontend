import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
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

const Router = () => {
    const dispatch = useDispatch();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            
            <Route
                path="/login"
                element={
                    <Login />
                }
            />
            <Route
                path="/home"
                element={
                    <MainLayout layout="home">
                        <Home />
                    </MainLayout>
                }
            />
            <Route
                path="/open"
                element={
                    <MainLayout layout="open">
                        <Open />
                    </MainLayout>
                }
            />
            <Route
                path="/addchecklist"
                element={
                    <MainLayout layout="open">
                        <AddChecklist />
                    </MainLayout>
                }
            />
            <Route
                path="/close"
                element={
                    <MainLayout layout="close">
                        <Close />
                    </MainLayout>
                }
            />
            <Route
                path="/temperatures"
                element={
                    <MainLayout layout="temperatures">
                        <Temperatures />
                    </MainLayout>
                }
            />
            <Route
                path="/alert"
                element={
                    <MainLayout layout="temperatures">
                        <Alert />
                    </MainLayout>
                }
            />
            <Route
                path="/team"
                element={
                    <MainLayout layout="team">
                        <Team />
                    </MainLayout>
                }
            />
            <Route
                path="/addteam"
                element={
                    <MainLayout layout="team">
                        <AddTeam />
                    </MainLayout>
                }
            />
            <Route
                path="/information"
                element={
                    <MainLayout layout="information">
                        <Information />
                    </MainLayout>
                }
            />
            <Route
                path="/incidents"
                element={
                    <MainLayout layout="incidents">
                        <Incidents />
                    </MainLayout>
                }
            />
            <Route
                path="/reports"
                element={
                    <MainLayout layout="reports">
                        <Reports />
                    </MainLayout>
                }
            />
            <Route
                path="/allergy"
                element={
                    <MainLayout layout="allergy">
                        <Allergy />
                    </MainLayout>
                }
            />
            <Route
                path="/settings"
                element={
                    <MainLayout layout="settings">
                        <Settings />
                    </MainLayout>
                }
            />
        </Routes>
    )
}

export default Router;