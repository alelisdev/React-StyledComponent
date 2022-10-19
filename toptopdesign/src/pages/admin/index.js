import { useEffect } from "react";
import AdminNavbar from "./components/adminNavbar";
import LeftSideBar from "./components/leftSidebar/leftSidebar";
import { Styles } from './style';
import { useNavigate } from "react-router-dom";

export default function Admin({children}){
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const adminAuth = JSON.parse(localStorage.getItem('adminAuth'));
            if(!adminAuth || adminAuth.status === 'error') navigate('/admin/signin');
        }catch(err){
            navigate('/admin/signin');
        }
    }, [navigate])
    return (
        <Styles>
            <div className="admin-container">
                <div className="side-bar">
                    <LeftSideBar children={children}/>
                </div>
                <div className="right-panel">
                    <AdminNavbar />
                    {children}
                </div>
            </div>
        </Styles>
    )

}