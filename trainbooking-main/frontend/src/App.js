import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import AdminPage from "./AdminPage";
import Train from './Train';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
//import LoginForm from './AdminLogin';
import AdminLoginPage from './AdminLoginPage';
import AdminOperations from './AdminOperations';
import UpdateTrain from './UpdateTrain';
import InsertTrain from './InsertTrain';
import UserOperations from './UserOperations';
import TicketInfo from './TicketInfo';

import Ticket from "./ticket";
const App = () => {
    
    return (
        <div >
            <div >
                <Router>
                    <Routes>
                        <Route path="/" element={<Train />} />
                        <Route path="/UserLogin" element={<UserLogin />} />
                        <Route path="/UserRegistration" element={<UserRegistration />} />
                        <Route path="/AdminLoginPage" element={<AdminLoginPage/>} />
                        {/* <Route path="/AdminLogin" element={  <LoginForm />} /> */}
                        <Route path="/AdminOperations" element={<AdminOperations/>} />
                        <Route path="/UpdateTrain" element={<UpdateTrain/>} />
                        <Route path="/InsertTrain" element={<InsertTrain/>} />
                        <Route path="/UserOperations" element={<UserOperations/>} />
                        <Route path="/TicketInfo" element={<TicketInfo/>} />
                        <Route path="/getticket" element={<Ticket/>} />
                    </Routes>
                </Router>
            </div>
        </div>
    );

};
export default App;