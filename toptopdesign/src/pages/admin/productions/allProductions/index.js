import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/searchBox';
import {Styles} from './style';
import { ReactComponent as AddIcon } from '../../../../assets/img/user/collection/add.svg';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import ProductionTable from './productionTable';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProductById } from '../../../../api/admin/productions';

const AddUser = withStyles((theme) => ({
    root: {
        marginLeft: '24px !important',
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

export default function AllProductions(){
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [productions, setProductions] = useState([]);
    const [selected, setSelected] = useState([]);

    const searchUser = () => {

    }

    const deleteProduct = async(id) => {
        const res = await deleteProductById(id);
        if(res.status === 200)
            setProductions(res);
    }

    const getInitialData = useCallback(async() => {
        const res = await getAllProducts();
        console.log(res)
        setProductions(res.products);
    }, [])

    useEffect(() => {
        getInitialData();
    }, [getInitialData])

    return (
        <Styles>
            <div className='all-productions-header'>
                <div className='topic'>
                    All Products
                </div>
                <div className='action-group'>
                    <SearchBox
                        keyword={keyword}
                        setKeyword={setKeyword}
                        searchUser={searchUser}
                        placeholder='Search product..'
                    />
                    <AddUser onClick={() => navigate('/admin/productions/add')}>
                        <AddIcon className='icon'/>
                        <span>Add Product</span>
                    </AddUser>
                </div>
            </div>
            {productions && productions.length > 0 && 
                <ProductionTable 
                    productions={productions}
                    selected={selected}
                    getInitialData={getInitialData}
                    setSelected={setSelected}
                    deleteProduct={deleteProduct}
                />
            }
        </Styles>
    )
}