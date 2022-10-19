import { Styles } from './style';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { ReactComponent as DeleteRed } from '../../../../../../assets/img/admin/delete_red.svg';

const DeleteButton = withStyles((theme) => ({
    root: {
        padding: 0,
        color: `var(--white) !important`,
        background: 'rgba(252, 52, 0, 0.1)',
        borderRadius: 4,
        cursor: 'pointer !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        height: '48px !important',
        minWidth: 42,
        width: '42px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: `var(--warnig) !important`,
        },
    },
}))(Button);


export default function NewImageTag({image, deleteImage}){
    return (
        <Styles>
            <div className='image-tag-container'>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className='manro-normal-14'>Img</div>
                    <div className='image-preview'>
                        <img className='image' src={URL.createObjectURL(image)} alt=''/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className='manro-normal-14'>Tag</div>
                    <div className='tag-container'></div>
                </div>
                <DeleteButton onClick={() => deleteImage(image)}>
                    <DeleteRed />
                </DeleteButton>
            </div>
        </Styles>
    )
}