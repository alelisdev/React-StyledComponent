import React, { useState, useEffect, useContext } from 'react';
import { Styles } from "./style/homeStyle";
import { Grid } from '@mui/material';
import SearchBox from './components/searchBox';
import {
    allPatternItems
} from '../../assets/config';
import IndeterminateCheckbox from '../../components/checkBox';
import { ReactComponent as SearchIcon } from '../../assets/img/user/home/search.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/img/user/left_arrow.svg';
import ImageView from './components/imageView';
import Footer from '../../components/footer';
import { 
    getAllProducts,
    getProducts,
    getSearchResults,
    sendVisitor,
} from '../../api/home';
import OutsideClickHandler from './components/outSide';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const MoreButton = withStyles((theme) => ({
    root: {
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-pp_telegraf-regular) !important`,
        fontSize: `var(--font-size-24) !important`,
        fontWeight: `400px !important`,
        fontStyle: 'normal !important',
        width: '221px !important',
        height: '53px !important',
        borderRadius: '63px !important',
        cursor: 'pointer !important',
        lineHeight: '24px !important',
        backgroundColor: `var(--black-normal) !important`,
        letterSpacing: '0px !important',
        whiteSpace: 'nowrap !important',
        marginBottom: '50px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: `var(--black-hover) !important`,
        },
    },
  }))(Button);


const BackButton = withStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        color: `var(--white) !important`,
        fontFamily: `var(--font-family-pp_telegraf-regular) !important`,
        fontSize: `var(--font-size-24) !important`,
        fontWeight: `400px !important`,
        fontStyle: 'normal !important',
        minWidth: '53px !important',
        width: '53px !important',
        height: '53px !important',
        borderRadius: '53px !important',
        border: '1px solid var(--second)',
        cursor: 'pointer !important',
        backgroundColor: `var(--white) !important`,
        whiteSpace: 'nowrap !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        '&:hover': {
            opacity: '.7 !important',
            backgroundColor: `#9a9b9c !important`,
        },
    },
}))(Button);

export default function Detail(){
    const navigate = useNavigate();
    const [showPatternList, setShowPatternList] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [showSearchKey, setShowSearchKey] = useState('');
    const [showKeywordList, setShowKeywordList] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const searchFunction = async (key) => {
        setShowKeywordList(false);
        setSearchKey(key);
        if(key === '')
            setShowSearchKey(false);
        else
        {
            setShowSearchKey(true);
            const res = await getSearchResults(key);
            if(res.data && res.data.searchResults && res.data.searchResults.length > 0)
                setSearchResults(res.data.searchResults);
            else
                setSearchResults([]);
        }
    }

    const viewFullPattern = () => {
        setShowPatternList(!showPatternList);
    };

    const showKeyword = () => {
        setShowPatternList(false);
    }

    useEffect(() => {
        try{
            async function getInitialData(){
                const data = await getAllProducts();
                setSearchResults(data.products);
                setAllProducts(data.products);
            }
            getInitialData();

            sendVisitor();
        }catch(err){
            console.log(err);
        }
        
    }, []);
    return (
        <Styles>
            <div className='home-before-container'>
                <div className='home-container'>
                    <SearchBox 
                        setShowKeywordList={setShowKeywordList}
                        showKeywordList={showKeywordList} 
                        showKeyword={showKeyword} 
                        searchFunction={searchFunction} 
                    />
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setShowPatternList(false)
                        }}
                    >
                        <div className="center-container">
                            <div 
                                className="view-full"
                                onClick={() => viewFullPattern()}
                            >
                                View full pattern list
                            </div>
                            {showPatternList && 
                                <div className="pattern-container">
                                    {allPatternItems && allPatternItems.map((info, idx) => {
                                        return (
                                            <div className='pattern-item'>
                                                <IndeterminateCheckbox info={info} key={idx}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </OutsideClickHandler>
                    
                    {showSearchKey && 
                        <React.Fragment>
                            <div className='keyword-container'>
                                <BackButton>
                                    <LeftArrowIcon />
                                </BackButton>
                                <SearchIcon />
                                <div className='search-keyword'>{searchKey}</div>
                            </div>
                        </React.Fragment>
                    }
                    {searchResults.length > 0 &&(
                        <>
                            <div className="all-searched-app">
                                <div className="app-list">
                                    <Grid container spacing={window.innerWidth<=500?1:2}>
                                        {searchResults.map((info, idx) => {
                                            return (
                                                <Grid item sm={6} xs={6} md={3} key={idx}>
                                                    <ImageView 
                                                        info={info}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </div>
                            </div>
                            {searchResults.length && 
                                <div className='center-mode'>
                                    <MoreButton>
                                        More
                                    </MoreButton>
                                </div>
                            }
                        </>
                    )}
                    <div className='user-view'>
                        <div className='txt'>
                            Users also view
                        </div>
                        <div style={{display: 'flex'}}>
                            {allProducts && allProducts.map((item, idx) => {
                                return (
                                    <div className={idx === 0?'user-view-card-root':'user-view-card-root ml-16'} key={idx}>
                                        <div className='user-view-card'>
                                            <div className='img'>
                                            </div>
                                            <div className='card-name'>
                                                {item.productName}
                                            </div>
                                            <div className='card-category'>
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}    
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Styles>
    )
}