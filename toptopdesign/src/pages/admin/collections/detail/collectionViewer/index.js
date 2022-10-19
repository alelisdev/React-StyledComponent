import { Styles } from './style';
import Checkbox from '@mui/material/Checkbox';

export default function CollectionViewer({item, images, setImages}){
    const handleChange = () => {
        const tmp = images.map((val, idx) => {
            if(val.label === item.label)
                return { label: val.label, value: !val.value};
            else
                return val;
        })
        setImages(tmp)
    }

    return (
        <Styles>
            <Checkbox 
                checked={item.value} 
                sx={{
                    color: 'var(-txt-gray)',
                    '&.Mui-checked': {
                        color: '#84818A',
                    },
                    width: 12,
                    height: 12,
                }}
                onChange={handleChange}
            />
            <img className='image-viewer' alt='' src='/img/user/collection/collection.png'/>
        </Styles>
    )
}