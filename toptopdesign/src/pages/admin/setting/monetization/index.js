import { Styles } from './style';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { monetizations } from '../../../../assets/config';

const ColorButton = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        border: '1px solid #EBEAED !important',
        color: `var(--second) !important`,
        fontFamily: `var(--font-family-manrope) !important`,
        fontSize: `var(--font-size-14) !important`,
        fontWeight: '600px !important',
        fontStyle: 'normal !important',
        height: '48px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        cursor: 'pointer !important',
        '&:hover': {
            opacity: '.7 !important',
            color: `var(--white) !important`,
            backgroundColor: `var(--second) !important`
        },
    },
}))(Button);

const CreateButton = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        border: '1px solid #EBEAED !important',
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-manrope) !important`,
        fontSize: `var(--font-size-14) !important`,
        fontWeight: '600px !important',
        fontStyle: 'normal !important',
        height: '48px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        cursor: 'pointer !important',
        width: '138px !important',
        backgroundColor: 'var(--ocean-blue-pearl)',
        '&:hover': {
            opacity: '.7 !important',
            color: `var(--white) !important`,
            backgroundColor: `var(--purple) !important`
        },
    },
}))(Button);

export default function Monetization(){
    const navigate = useNavigate();
    const [isFulled, setIsFulled] = useState(false);
    
    return (
        <Styles>
            <div className='monetization'>
                {monetizations.map((item, idx) => {
                    return (
                        <div className='monetization-item' key={idx}>
                            <div className='title'>{item.label}</div>
                            <div className='image'></div>
                        </div>
                    )
                })}
                
            </div>
            <div className='left-panel-footer'>
                <ColorButton onClick={() => navigate('/admin/setting/accounts')}>
                    Discard
                </ColorButton>
                {!isFulled?
                    <ColorButton 
                        className='ml-24'
                    >
                        Next
                    </ColorButton>:
                    <CreateButton 
                        className='ml-24'
                    >
                        Create
                    </CreateButton>
                }
            </div>
        </Styles>
    )
}