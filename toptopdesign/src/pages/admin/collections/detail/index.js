import { useState } from 'react';
import { Styles, ConfirmStyle } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { ReactComponent as DeleteRed } from '../../../../assets/img/admin/delete_red.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from '@mui/material';
import CollectionViewer from './collectionViewer';
import Dialog from '@mui/material/Dialog';
import CancelButton from '../../../auth/components/cancelButton';
import { useCallback } from 'react';
import { getCollectionById } from '../../../../api/collection';
import { useEffect } from 'react';
import { imageList } from '../../../../assets/config';

const DeleteButton = withStyles((theme) => ({
    root: {
        padding: 0,
        marginLeft: 24,
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

const ArrowButton = withStyles((theme) => ({
    root: {
        padding: 0,
        minWidth: 48,
        color: `var(--black) !important`,
        backgroundColor: 'var(--white)',
        borderRadius: 4,
        cursor: 'pointer !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        height: '48px !important',
        width: '48px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        border: '1px solid var(--divider)',
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: `var(-txt-gray) !important`,
        },
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

export default function CollectionDetail(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [collection, setCollection] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [images, setImages] = useState(imageList);
    
    const closeConfirmDlg = () => {
        setConfirmOpen(false);
    };
    const handleConfirmDlg = () => {
        const tmp = images.filter((item) => {
            return !item.value
        })
        setImages(tmp)
        setConfirmOpen(false);
    }

    const getInitialData = useCallback(async() => {
        const res = await getCollectionById(id);
        if(res.status === 200)
            setCollection(res.data);
    }, [id])

    useEffect(() => {
        getInitialData();
    }, [getInitialData])

    return (
        <Styles>
            <div className='collection-detail-container'>
                <div style={{display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid #EBEAED'}}>
                    <div className='collection-detail-header'>
                        <div className='first-line'>
                            <span 
                                style={{color: '#B6B4BA', cursor: 'pointer'}} 
                                onClick={() => navigate('/admin/collections/')}
                            >
                                Collection
                            </span>
                            <span style={{color: '#B6B4BA'}}>{` / ${collection?.author?.userName}`} </span>
                            <span style={{color: '#2E2C34'}}>{` / ${id}`}</span>
                        </div>
                        <div className='second-line'>
                            {`${id} ${collection?.collectionName}`}
                        </div>
                    </div>
                    <div className='action-group'>
                        <ArrowButton >
                            <ArrowBackIcon sx={{color: 'var(--charade)'}}/>
                        </ArrowButton>
                        <ArrowButton sx={{ml: 2}}>
                            <ArrowForwardIcon  sx={{color: 'var(--charade)'}}/>
                        </ArrowButton>
                        <DeleteButton onClick={() => setConfirmOpen(true)}>
                            <DeleteRed />
                        </DeleteButton>
                    </div>
                </div>
                <div className='collection-detail-body'>
                    <Grid container spacing={3}>
                        {images && images.map((item, idx) => {
                            return(
                                <Grid item md={3} sm={4} xs={6} key={idx}>
                                    <CollectionViewer
                                        item={item}
                                        images={images}
                                        setImages={setImages}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
            <Dialog
                open={confirmOpen} 
                onClose={closeConfirmDlg}
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
                <ConfirmStyle>
                    <div className='dialog-container'>
                        <div className="content">
                            <div className="header">
                                Remove collection items
                            </div>
                            <div className="body">
                                <div className="des-txt">
                                    Are you sure to remove the collection items? This proccess can not be redo.
                                </div>
                            </div>
                            <div className="footer">
                                <DlgButton onClick={() => handleConfirmDlg()}>
                                    Confirm
                                </DlgButton>
                            </div>
                            <CancelButton 
                                text={"Cancel"} 
                                onClick={closeConfirmDlg}
                            />
                        </div>
                    </div>
                </ConfirmStyle>
            </Dialog>
        </Styles>
    )
}