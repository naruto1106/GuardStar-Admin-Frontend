
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Team = () => {
    const navigate = useNavigate();
    const GotoAddTeam = () => {
        navigate("/addteam");
    }
    return (
        <>
            <h1 className="text-[28px] uppercase">Team</h1>
            <table className="table-auto mt-[150px]">
                <thead>
                    <tr>
                        <th className="py-3 uppercase w-1/4 text-left">Name</th>
                        <th className="py-3 uppercase w-1/4 text-center">Role</th>
                        <th className="py-3 uppercase w-1/4 ">Email Address</th>
                        <th className="py-3 uppercase w-1/4 ">Training</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 pl-[0px] text-left">Ronnie Luke</td>
                        <td className="p-4  text-center">Manager</td>
                        <td className="p-4  text-center">ronnieluke@topwork.com</td>
                        <td className="p-4  text-center">Level3</td>
                    </tr>
                    <tr>
                        <td className="p-4 pl-[0px] text-left">Ronnie Luke</td>
                        <td className="p-4  text-center">Manager</td>
                        <td className="p-4  text-center">ronnieluke@topwork.com</td>
                        <td className="p-4  text-center">Level3</td>
                    </tr>
                    <tr>
                        <td className="p-4 pl-[0px] text-left">Ronnie Luke</td>
                        <td className="p-4  text-center">Manager</td>
                        <td className="p-4  text-center">ronnieluke@topwork.com</td>
                        <td className="p-4  text-center">Level3</td>
                    </tr>
                    <tr>
                        <td className="p-4 pl-[0px] text-left">Ronnie Luke</td>
                        <td className="p-4 text-center">Manager</td>
                        <td className="p-4  text-center">ronnieluke@topwork.com</td>
                        <td className="p-4 text-center">Level3</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center mt-[150px]">
                <Button handleChange={GotoAddTeam} size="normal" name="Add New Member Team" variant="primary-normal" />
            </div>
        </>
    )
}

export default Team;