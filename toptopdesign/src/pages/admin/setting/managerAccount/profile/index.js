import { useEffect, useRef, useState } from 'react';
import { Styles } from "./profileStyle";
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import RemoveButton from './txtButton';
import CustomedInput from '../input';
import CustomedTextArea from '../textArea';
import { Grid } from '@mui/material';

const UploadButton = withStyles((theme) => ({
    root: {
        border: 'none',
        color: `var(--ocean-blue-pearl) !important`,
        fontFamily: `var(--font-family-open_sans) !important`,
        fontSize: `var(--font-size-17) !important`,
        fontWeight: '600px !important',
        fontStyle: 'normal !important',
        height: '45px !important',
        width: '155px !important',
        marginBottom: '0.78px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        cursor: 'pointer !important',
        backgroundColor: 'rgba(85, 66, 246, 0.1)',
        [`@media screen and (max-width: 650px)`]: {
            width: '150px !important',
            fontSize: `var(--font-size-16) !important`,
        },
       
        textTransform: 'none !important',
        transition: '.3s ease !important',
        '&:hover': {
            color: `var(--white) !important`,
            backgroundColor: `var(--purple) !important`,
        },
    },
}))(Button);

export default function Profile({ setProfile, profile }){
    const [userAvatarPath, setUserAvatarPath] = useState(profile?.userAvatarPath);
    const [userAvatar, setUserAvatar] = useState(profile?.userAvatar);
    const [firstName, setFirstName] = useState(profile?.firstName);
    const [lastName, setLastName] = useState(profile?.lastName);
    const [userName, setUserName] = useState(profile?.userName);
    const [email, setEmail] = useState(profile?.email);
    const [oldPassword, setOldPassword] = useState(profile?.oldPassword);
    const [newPassword, setNewPassword] = useState(profile?.newPassword);

    const uploadRef = useRef();

    const [isAllowed, setAllowed] = useState(false);
    
    const handleChange = (value) => {
        setOldPassword(value);
        const ck =value;
       
        function isAlphaOrParen(str) {
            return /[a-zA-Z]/.test(str);
        }
        
        function containsNumber(str) {
            return /\d/.test(str);
        }
        if(isAlphaOrParen(value) && containsNumber(ck) && ck.length >= 8) setAllowed(true);
        else setAllowed(false);
    }

    useEffect(() => {
        setProfile({ 
            userAvatar, 
            userAvatarPath, 
            firstName, 
            lastName, 
            userName, 
            email, 
            newPassword, 
            oldPassword
        });
    }, [email, firstName, lastName, newPassword, oldPassword, setProfile, userAvatar, userAvatarPath, userName])
    
    return (
        <Styles>
            <div className="edit-profile-container">
                <div className="edit-header">
                    <div className="edit-avatar">
                        {userAvatarPath &&
                            <img
                                className='avatar-size'
                                alt="" 
                                src={userAvatarPath} 
                            />
                        }
                    </div>
                    <UploadButton onClick={() => uploadRef.current.click()}>
                        Upload picture
                    </UploadButton>
                    <input
                        ref={uploadRef}
                        type="file"
                        hidden
                        onChange={(event) => {
                            setUserAvatarPath(URL.createObjectURL(event.target.files[0]));
                            setUserAvatar(event.target.files[0]);
                        }}
                    />
                    <RemoveButton 
                        text={"Delete"}
                        onClick={()=>{
                            setUserAvatarPath(null);
                            setUserAvatar(null);
                        }}
                    />
                </div>
                <div className="edit-body">
                    <div className='edit-info'>Account Information</div>
                    <Grid container spacing={2} className='edit-name'>
                        <Grid item xs={6}>
                            <CustomedInput
                                label='First name*'
                                inputValue={firstName}
                                inputHandler={setFirstName}
                                placeholderName="Your first name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomedInput
                                label='Last name'
                                inputValue={lastName}
                                inputHandler={setLastName}
                                placeholderName="Your last name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomedInput
                                label='Username*'
                                inputValue={userName}
                                inputHandler={setUserName}
                                placeholderName="Your location"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomedInput
                                label='Login Email*'
                                type='email'
                                inputValue={email}
                                inputHandler={setEmail}
                                placeholderName="Login Email"
                            />
                        </Grid>
                    </Grid>
                    <div className="password-body">
                        <div className='password-info'>Password</div>
                        <CustomedInput
                            label='Create Password*'
                            inputValue={oldPassword}
                            inputHandler={handleChange}
                            placeholderName=""
                        />
                        
                        <div className={isAllowed?"password-alarm": "password-alarm warning"}>
                            Minimum 8 characters including one number and one alphabet
                        </div>
                        <CustomedInput
                            label='Enter new password again*'
                            inputValue={newPassword}
                            inputHandler={setNewPassword}
                            placeholderName=""
                        />
                    </div>
                </div>
            </div>
        </Styles>
    )
}