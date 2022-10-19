import { useCallback, useEffect, useState } from 'react';
import {Styles} from './style';
import { ReactComponent as AddIcon } from '../../../../assets/img/user/collection/add.svg';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SettingTab from '../../components/settingTab';
import { useNavigate } from 'react-router-dom';
import { AccountsContext } from '../../../../context/accounts';
import {
    getAllUsers,
    getActiveUsers,
    getNewUsers,
    getSuspendedUsers,
} from '../../../../api/admin/users';

const AddUser = withStyles((theme) => ({
    root: {
        marginLeft: '14px !important',
        height: '48px !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        backgroundColor: `var(--ocean-blue-pearl) !important`,
        borderRadius: '4px !important',
        cursor: 'pointer !important',
        textAlign: 'center !important',
        width: '179px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-pp_telegraf-regular) !important`,
        fontSize: `var(--font-size-m) !important`,
        fontWeight: '400px !important',
        fontStyle: `normal !important`,
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: 'var(--ocean-blue-pearl) !important',
        },
        '& .icon': {
            marginRight: 8,
        }
    },
  }))(Button);

export default function SettingLayout({children}){
    const navigate = useNavigate();
    
    const handleTabs = async (val) => {
        if(val === 0){
            navigate('/admin/setting/accounts/');
        }else{
            if(val === 1){
                navigate('/admin/setting/integrations/');
            }else{
                if(val === 2){
                    navigate('/admin/setting/monetization/');
                }
            }
        }
    }
    
    return (
        <Styles>
            <div className='all-users-header'>
                <div className='topic'>
                    Settings
                </div>
                <div className='action-group'>
                    <AddUser onClick={() => navigate('/admin/setting/accounts/add/')}>
                        <AddIcon className='icon'/>
                        <span>Add Manager</span>
                    </AddUser>
                </div>
            </div>
            <SettingTab handleTabs={handleTabs}/>
            {children && children}
        </Styles>
    )
}