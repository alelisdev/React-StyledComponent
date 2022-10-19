import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Styles } from "./profileStyle";
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import RemoveButton from './txtButton';
import CustomedInput from '../input';
import { Grid } from '@mui/material';
import { 
    upDateCustomerProfile,
    uploadAvatar,
} from '../../../../../api/admin/users';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

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

const Profile = forwardRef((props, ref) => {
    const { setProfile, profile } = props;
    const [userAvatarPath, setUserAvatarPath] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    if (typeof window !== "undefined") {
        injectStyle();
    }
    const uploadRef = useRef();
    const [isAllowed, setAllowed] = useState(true);
    
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

    const uploadImage = useCallback(async() => {
        const formData = new FormData()
        formData.append('image', userAvatar);
        return await uploadAvatar(formData);
    }, [userAvatar])

    const saveOption = useCallback(async () => {
        if(isAllowed && (newPassword === oldPassword)){
            let result = [];
            if(userAvatarPath && userAvatar){
                const res = await uploadImage();
                if(res?.filePath){
                    result = await upDateCustomerProfile(
                        profile._id, 
                        res?.filePath, 
                        firstName, 
                        lastName, 
                        userName, 
                        email,
                        oldPassword
                    );
                }
            }else{
                result = await upDateCustomerProfile(
                    profile._id, 
                    profile.avatarPath, 
                    firstName, 
                    lastName, 
                    userName, 
                    email,
                    oldPassword
                );
            }

            if(result.status === 200){
                setProfile(result.data);
                await toast.warn('customer created!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return true;
            }else{
                toast.warn('Failed!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false;
            }
        }else{
            toast.warn('Password type error!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
        
    }, [isAllowed, newPassword, oldPassword, userAvatarPath, userAvatar, uploadImage, profile._id, profile.avatarPath, firstName, lastName, userName, email, setProfile])

    useImperativeHandle(ref, () => ({ saveOption }), [saveOption])

    useEffect(() => {
        try{
            if(profile?.avatarPath)
                setUserAvatarPath(`${process.env.REACT_APP_UPLOAD_URL}${profile?.avatarPath}`);
            else
                setUserAvatarPath('');
            setFirstName(profile?.firstName);
            setLastName(profile?.lastName);
            setUserName(profile?.userName);
            setEmail(profile?.email);
            setOldPassword(profile?.password);
            setNewPassword(profile?.password);
        }catch(err){
            console.log(err);
        }
    }, [profile?.avatarPath, profile?.email, profile?.firstName, profile?.lastName, profile?.password, profile?.userName])

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
            <ToastContainer />
        </Styles>
    )
})

export default Profile;