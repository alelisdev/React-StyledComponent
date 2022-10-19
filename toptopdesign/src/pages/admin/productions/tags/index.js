import { useCallback, useEffect, useState } from 'react';
import {Styles, ForgotStyle} from './style';
import { ReactComponent as DeleteRed } from '../../../../assets/img/admin/delete_red.svg';
import { ReactComponent as AddIcon } from '../../../../assets/img/user/collection/add.svg';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TagTable from './tagTable';
import { useParams } from 'react-router-dom';
import {
    getTagsById,
    addNewTagToCategory,
    updateTagToCategory,
    // deleteTagsByCategory
} from '../../../../api/admin/category';
import Dialog from '@mui/material/Dialog';
import CancelButton from '../../../auth/components/cancelButton';

const DeleteButton = withStyles((theme) => ({
    root: {
        padding: 0,
        margin: '0px 24px',
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


const AddUser = withStyles((theme) => ({
    root: {
        marginLeft: '14px !important',
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

  
const DlgButton = withStyles((theme) => ({
    root: {
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-pp_telegraf-regular) !important`,
        fontSize: `var(--font-size-24) !important`,
        fontWeight: '400px !important',
        fontStyle: `normal !important`,
        backgroundColor: `var(--black-normal) !important`,
        cursor: 'pointer !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        height: '53px !important',
        width: '528px !important',
        letterSpacing: '0px !important',
        lineHeight: '24px !important',
        whiteSpace: 'nowrap !important',
        borderRadius: '63px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        border: '1px solid #6A00DA',
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: `var(--black-hover) !important`,
        }
    },
}))(Button);


export default function Tags(){
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isAdding, setAdding] = useState(false);

    const [forgotOpen, setForgotOpen] = useState(false);
    const closeForgotDlg = () => {
        setForgotOpen(false);
    };

    const deleteTag = async() => {
        const tagTmp = category.tags.filter((item) => {
            return (!selected.includes(item.tagName))
        })
        const res = await updateTagToCategory(id, tagTmp)
        if(res.status === 200)
            setCategory(res.data);
        setForgotOpen(false);
    }


    const addNewTag = async (tagName, count) => {
        const res = await addNewTagToCategory(id, tagName, count);
        if(res.status === 200)
            setCategory(res.data);
    }

    const editTagName = async (index, tagName) => {
        const tagTmp = category.tags.map((item, idx) => {
            if(idx === index){
                return {tagName, count: item.count};
            }else{
                return item;
            }
        })
        const res = await updateTagToCategory(id, tagTmp)
        if(res.status === 200)
            setCategory(res.data);
    }

    const editCount = async (index, count) => {
        const tagTmp = category.tags.map((item, idx) => {
            if(idx === index){
                return {tagName: item.tagName, count};
            }else{
                return item;
            }
        })
        const res = await updateTagToCategory(id, tagTmp)
        if(res.status === 200)
            setCategory(res.data);
    }


    const getInitialData = useCallback(async() => {
        const res = await getTagsById(id);
        if(res.status === 200)
            setCategory(res.data);
    }, [id])

    useEffect(() => {
        getInitialData();
    }, [getInitialData])

    return (
        <Styles>
            <div className='all-users-header'>
                <div className='topic'>
                    {category.name}
                </div>
                <div className='action-group'>
                    <DeleteButton onClick={() => setForgotOpen(true)}>
                        <DeleteRed />
                    </DeleteButton>
                    <AddUser onClick={() => setAdding(true)}>
                        <AddIcon className='icon'/>
                        <span>New Tag</span>
                    </AddUser>
                </div>
            </div>
            {category && category?.tags && 
                <TagTable 
                    tags={category.tags}
                    selected={selected}
                    isAdding={isAdding}
                    getInitialData={getInitialData}
                    setSelected={setSelected}
                    setAdding={setAdding}
                    addNewTag={addNewTag}
                    editTagName={editTagName}
                    editCount={editCount}
                />
            }
            <Dialog
                open={forgotOpen} 
                onClose={closeForgotDlg}
                maxWidth='md'
                fullWidth={true}
                PaperProps={{
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 24,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        
                    },
                }}
            >
                <ForgotStyle>
                    <div className='dialog-container'>
                        <div className="content">
                            <div className="header">
                                Remove
                            </div>
                            <div className="body">
                                <div className="des-txt">
                                Are you sure to remove the selected tag(s)? This process can’t be redo.
                                </div>
                            </div>
                            <div className="footer">
                                <DlgButton onClick={deleteTag}>
                                    Yes
                                </DlgButton>
                            </div>
                            <CancelButton 
                                text={"Cancel"} 
                                onClick={closeForgotDlg}
                            />
                        </div>
                    </div>
                </ForgotStyle>
            </Dialog>
        </Styles>
    )
}