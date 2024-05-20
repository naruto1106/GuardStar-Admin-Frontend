
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getTeamlists } from "../action/team";
import { getTeamlist } from "../reducer/TeamSlice";
const Team = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teamlists = useSelector(getTeamlist);
    const [team, setTeam] = useState([]);
    useEffect(()=>{
        if(teamlists.length > 0) {
            setTeam(teamlists);
        }
    },[teamlists])
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        dispatch(getTeamlists(userData._id))
        
    }, [])

    const GotoAddTeam = () => {
        navigate("/addteam");
    }
    const handleEditChange = async (id) => {
        navigate(`/editteam/${id}`)
      }
    return (
        <>
            <h1 className="text-[28px] uppercase">Team</h1>
            <table className="table-auto mt-[150px]">
                <thead>
                    <tr>
                        <th className="py-3 uppercase w-1/4 text-left">Name</th>
                        <th className="py-3 uppercase w-1/4 ">Email Address</th>
                        <th className="py-3 uppercase w-1/4 ">Training</th>
                        <th className="py-3 uppercase w-1/4 text-center">UserLevel</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        team.length > 0 && team.map((item, index) => (
                            <tr key={index} className="cursor-pointer" onClick={() => handleEditChange(item._id)}>
                                <td className="p-4 pl-[0px] text-left"> {item.name} </td>
                                <td className="p-4  text-center"> {item.email} </td>
                                <td className="p-4  text-center"> {item.trainingLevel} </td>
                                <td className="p-4  text-center"> {item.userLevel} </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <div className="flex justify-center mt-[150px]">
                <Button handleChange={GotoAddTeam} size="normal" name="Add New Member Team" variant="primary-normal" />
            </div>
        </>
    )
}

export default Team;