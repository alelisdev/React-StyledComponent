import { Styles } from './style';
import React from 'react';

export default function CategoryItem(props){
    const {_id, name, tags} = props.info;
    return (
        <Styles>
            <div 
                className='category-item-container'
                onClick={() => props.handleClick(_id)}
            >
                <div className='category-des'>
                    <div className='category-name'>
                        {name}
                    </div>
                    <div className='category-number'>
                        {`${tags.length} Tags`}
                    </div>
                </div>
            </div>
        </Styles>
    )
}