import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../components/searchBox';
import {Styles} from './style';
import { ReactComponent as SuspendIcon } from '../../../assets/img/admin/suspend.svg';
import { ReactComponent as SuspendDisableIcon } from '../../../assets/img/admin/suspend_disable.svg';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import CollectionTabs from '../components/collectionTab';
import CollectionTable from './collectionTable';
import { useNavigate } from 'react-router-dom';
import {
    getAllCollection,
    getActiveCollections,
    suspendByIds,
    unSuspendByIds,
    getSuspendedCollections,
} from '../../../api/admin/collection';

const SuspendButton = withStyles((theme) => ({
    root: {
        padding: 0,
        marginLeft: 24,
        color: `var(--white) !important`,
        background: props => props.disable === 1?'rgba(132, 129, 138, 0.1)':'rgba(252, 52, 0, 0.1)',
        borderRadius: 4,
        cursor: 'pointer !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        height: '48px !important',
        width: '163px !important',
        textTransform: 'none !important',
        transition: '.3s ease !important',
        '&:hover': {
            opacity: props => props.disable === 1?'1':'.7 !important',
            backgroundColor: props => props.disable === 1?'rgba(132, 129, 138, 0.1)':`var(--warnig) !important`,
        },
        '& .txt':{
            color: props => props.disable === 1?'var(--txt-gray)':'#FC3400',
            marginLeft: 10,
        }
    },
}))(Button);

export default function CollectionsLayout(){
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [collections, setCollections] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isSuspend, setSuspend] = useState(true);

    const searchUser = () => {

    }

    const handleTabs = async (val) => {
        if(val === 0){
            const { collections } = await getAllCollection();
            setCollections(collections);
        }else{
            if(val === 1){
                const res = await getActiveCollections();
                if(res.status === 200)
                    setCollections(res.data);
            }else{
                if(val === 2){
                    const res = await getSuspendedCollections();
                    console.log(res)
                    if(res.status === 200)
                        setCollections(res.data);
                }
            }
        }
    }

    const suspendCollections = async() => {
        if(isSuspend){
            const res = await suspendByIds(selected);
            if(res.status === 200){
                getInitialData();
                setSelected([]);
            }
        }else{
            const res = await unSuspendByIds(selected);
            if(res.status === 200){
                getInitialData();
                setSelected([]);
            }
        }
    }

    const getInitialData = useCallback(async() => {
        const { collections } = await getAllCollection();
        setCollections(collections);
    }, [])

    useEffect(() => {
        getInitialData();
    }, [getInitialData])

    useEffect(() => {
        for (let item of selected) {
            if (!item.isActive) {
                setSuspend(false);
                break;
            }else{
                setSuspend(true);
            }
        }
    }, [selected])

    return (
        <Styles>
            <div className='all-collections-header'>
                <div className='topic'>
                    Collections
                </div>
                <div className='action-group'>
                    <SearchBox 
                        keyword={keyword}
                        setKeyword={setKeyword}
                        searchUser={searchUser}
                        placeholder='Search by author, name, ID...'
                    />
                    <SuspendButton 
                        disable={selected && selected.length > 0?0:1}
                        disabled={selected && selected.length > 0?false:true}
                        onClick={() => suspendCollections()}
                    >
                        {selected && selected.length > 0?<SuspendIcon />:<SuspendDisableIcon />}
                        <span className='txt'>{isSuspend?'Suspend':'Unsuspend'}</span>
                    </SuspendButton>
                </div>
            </div>
            <CollectionTabs handleTabs={handleTabs}/>
            {collections && collections.length > 0 && 
                <CollectionTable 
                    collections={collections}
                    selected={selected}
                    getInitialData={getInitialData}
                    setSelected={setSelected}
                />
            }
        </Styles>
    )
}