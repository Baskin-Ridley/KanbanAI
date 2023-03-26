import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Message from "../../components/Message";
import Form_Button from "../../components/Form_Button";
import Form_Input from "../../components/Form_Input";
import { useParams } from 'react-router-dom';

const Registration_member = () => {
    const { register_member } = useContext(UserContext);
    const { supervisors } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [registerView, setRegisterView] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register_member({
                username,
                name,
                password,
                email,
                role,
                avatar,
                supervisors,
            });
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const HandleSwitch = () => {
        setRegisterView(!registerView)
    }

    if (registerView) {
        return (
            // {if (registerView == true){

            // } }
            <>
                <main className="flex flex-col items-center justify-center">
                    <Message message={errorMessage} type="error" />
                    <h2 className="text-3xl font-bold mb-8 m-12 text-center">Registration </h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <Form_Input
                            label="Username:"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            formElementId="registration-field-username"
                            ariaLabel="Field in which to type the username"
                        />
                        <Form_Input
                            label="Name:"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            formElementId="registration-field-name"
                            ariaLabel="Field in which to type the name"
                        />
                        <Form_Input
                            label="Password:"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            formElementId="registration-field-password"
                            ariaLabel="Field in which to type the name"
                        />
                        <Form_Input
                            label="Email:"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            formElementId="registration-field-email"
                            ariaLabel="Field in which to type the email"
                        />
                        <Form_Input
                            label="Role:"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            formElementId="registration-field-role"
                            ariaLabel="Field in which to type the role"
                        />
                        <Form_Input
                            label="Avatar:"
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            formElementId="registration-field-avatar"
                            ariaLabel="Field in which to type the avatar field"
                        />
                        <Form_Button buttonText="Register" formElementId="registration-register-button" ariaLabel="Button to submit registration form" />
                    </form>
                </main>
            </>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">{supervisors} has invited you to register</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto" onClick={() => HandleSwitch()}>
                            Register
                        </button>
                    </div>
                </div>
            </div>



        )
    }



};

export default Registration_member
