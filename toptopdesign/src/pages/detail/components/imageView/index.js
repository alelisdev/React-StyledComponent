import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Styles, ViewCollectionDlgStyle } from './style/imageViewStyle';
import { ReactComponent as Favourite } from '../../../../assets/img/user/favourite.svg';
import { ReactComponent as UnFavourite } from '../../../../assets/img/user/unfavourite.svg';
import IconButton from '@mui/material/IconButton';
import CloseButton from './closeBtn';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { addLikedProduct, addViewedProduct } from '../../../../api/home';

const colorPalette = [
    {
        color: '#38AB01'
    },
    {
        color: '#174700'
    },
    {
        color: '#008FBC'
    },
    {
        color: '#00D5E2'
    },
    {
        color: '#A000D8'
    }
]

export default function ImageView({ info }){
    const {liked, imageList, productName, _id} = info;

    const [collectionOpen, setCollectionOpen] = useState(false);
    const [createdOpen, setCreatedOpen] = useState(false);
    const [favourite, setFavourite] = useState(liked);

    const viewCollections = async() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        await addViewedProduct(auth._id, _id);
        setCollectionOpen(true);
    }

    const closeViewCollectionsDlg = () => {
        setCollectionOpen(false);
    };

    const getInitialData = useCallback(async () => {
    }, [])

    const openNewCollection = () => {
        closeViewCollectionsDlg();
        setCreatedOpen(true);
    }

    const closeCreatedDlg = () => {
        setCreatedOpen(false);
    };
    
    useEffect(() => {
        getInitialData();
    }, [getInitialData])
    
    return (
        <Styles>
            <div className='image-container'>
                <div className='favourite'>
                    {favourite?
                        <IconButton 
                            aria-label="delete"
                            onClick={viewCollections}
                        >
                            <Favourite className='icon' />
                        </IconButton>:
                        <IconButton 
                            aria-label="delete"
                            onClick={viewCollections}
                        >
                            <UnFavourite className='icon' />
                        </IconButton>}
                </div>
                <Dialog
                    open={collectionOpen} 
                    onClose={closeViewCollectionsDlg}
                    maxWidth='md'
                    fullWidth={true}
                    PaperProps={{
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 24,
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            maxWidth: 1440,
                            '@media(minWidth: 780px)' : {
                                height: 486,
                            }
                        },
                    }}
                >
                    <ViewCollectionDlgStyle>
                        <div className='dialog-container'>
                            <div className='left-panel'>

                            </div>
                            <div className='right-panel'>
                                <div className='header'>
                                    <div className='txt'>
                                        Details  
                                    </div>
                                </div>
                                <div className='body'>
                                    <div className='date-container'>
                                        <div className='txt'>Date Updated</div>
                                        <div className='date'>DD/MM/YYYY</div>
                                    </div>
                                    <div className='version-container'>
                                        <div className='txt'>Version</div>
                                        <div style={{display: 'flex'}}>
                                            <div className='version'>1</div>
                                            <div className='version'>2</div>
                                            <div className='version'>3</div>
                                        </div>
                                    </div>
                                    <div className='category-container'>
                                        <div className='txt'>Category</div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div className='category'>#sign-in</div>
                                            <div className='category'>#fintech</div>
                                            <div className='category'>#login</div>
                                        </div>
                                    </div>
                                    <div className='color-container'>
                                        <div className='txt'>Color Palette</div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div className='left-radius'></div>
                                            {colorPalette.map((item, idx) => {
                                                return (
                                                    <div style={{color: `${item.color}`}}>

                                                    </div>
                                                )
                                            })}
                                            <div className='right-radius'></div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <CloseButton handleClose={closeViewCollectionsDlg}/>
                    </ViewCollectionDlgStyle>
                </Dialog>
            </div>
        </Styles>
    )
}