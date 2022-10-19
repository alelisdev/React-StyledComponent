import { settingCollections, settingProducts, settingUsers } from '../../../../../assets/config';
import CustomedCheckBox from './checkbox';
import { Styles } from './levelStyle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useEffect, useState } from 'react';

export default function Level({accessLevel, setAccessLevel}){
    const [overView, setOverView] = useState(false);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState(false);
    const [collections, setCollections] = useState(false);

    useEffect(() => {
        setAccessLevel({
            overView,
            products,
            users,
            collections,
        })
    }, [collections, overView, products, setAccessLevel, users])

    return(
        <Styles>
            <div className='access-level'>
                Access Level Settings
            </div>
            <div className='parent'>
                <FormControlLabel 
                    value="overview" 
                    control={<Radio />} 
                    label="Access Overview Page" 
                />
            </div>
            <div className='parent'>
                <FormControlLabel value="products" control={<Radio />} label="Products" />
                {settingProducts.map((item, idx) => {
                    return (
                        <div className='child' key={idx}>
                            <CustomedCheckBox label={item.label}/>
                        </div>
                    )
                })}
            </div>
            <div className='parent'>
                <FormControlLabel value="users" control={<Radio />} label="Users" />
                {settingUsers.map((item, idx) => {
                    return (
                        <div className='child' key={idx}>
                            <CustomedCheckBox label={item.label}/>
                        </div>
                    )
                })}
            </div>
            <div className='parent'>
                <FormControlLabel value="collections" control={<Radio />} label="Collections" />
                {settingCollections.map((item, idx) => {
                    return (
                        <div className='child' key={idx}>
                            <CustomedCheckBox label={item.label}/>
                        </div>
                    )
                })}
            </div>
        </Styles>
    )
}