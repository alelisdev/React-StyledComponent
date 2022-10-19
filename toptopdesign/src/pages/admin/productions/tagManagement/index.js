import { Styles } from './style';
import { useCallback, useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { ReactComponent as DeleteRed } from '../../../../assets/img/admin/delete_red.svg';
import CategoryItem from './categoryItem';
import { useNavigate } from 'react-router-dom';
import { getCategories, addCategory } from '../../../../api/admin/category';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

const SaveButton = withStyles((theme) => ({
    root: {
        marginLeft: '18px !important',
        marginRight: '18px !important',
        height: '48px !important',
        display: 'flex !important',
        padding: '0px 17px !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        backgroundColor: `var(--ocean-blue-pearl) !important`,
        borderRadius: '4px !important',
        cursor: 'pointer !important',
        textAlign: 'center !important',
        width: '177px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-pp_telegraf-regular) !important`,
        fontSize: `var(--font-size-m) !important`,
        fontWeight: '400px !important',
        fontStyle: `normal !important`,
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: 'var(--blue-hover) !important',
        },
        '& .icon': {
            marginRight: 8,
        }
    },
  }))(Button);

export default function TagManagementLayout(){
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    if (typeof window !== "undefined") {
        injectStyle();
    }

    const handleAdd = () => {
        setOpenAddCategory(true);
    }

    const addFunc = async () => {
        setOpenAddCategory(false);
        const res = await addCategory(categoryName);
        if(res.status === 200){
            setCategories(res.data);
            await toast.warn('category created!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            await toast.warn(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleClose = () => {
        setOpenAddCategory(false);
    };

    const handleClick = (val) => {
        navigate(`/admin/tags/${val}`)
    }

    const getInitialData = useCallback(async() => {
        const res = await getCategories();
        if(res.status === 200)
            setCategories(res.data);
        else
            setCategories([]);
    }, [])

    useEffect(() => {
        getInitialData();
    }, [getInitialData])

    return (
        <Styles>
            <div className='category-container'>
                <div
                    style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid #EBEAED'}}>
                    <div className='category-header'>
                        Categories
                    </div>
                    <div style={{marginLeft: 'auto', display: 'flex'}}>
                        <SaveButton onClick={handleAdd}>
                            <span>Add Category</span>
                        </SaveButton>
                    </div>
                </div>
                <div className='category-card-container'>
                    {categories && categories.length > 0 && categories.map((item, idx) => {
                        return (
                            <CategoryItem 
                                info={item} 
                                key={idx}
                                handleClick={handleClick}
                            />
                        )
                    })}
                </div>
                <Dialog open={openAddCategory} onClose={handleClose}>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please input category name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => addFunc()}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <ToastContainer />
        </Styles>
    )
}