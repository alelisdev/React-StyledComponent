import { Styles } from "./inputStyle";

export default function CustomedInput({inputValue, inputHandler, enterEvent}){

    return (
        <Styles>
            <input
                type='text'
                className='customed-input'
                onChange={e => inputHandler(e.target.value)}
                value={inputValue}
                onKeyUp={(e) => {
                    if(e.code === 'Enter'){
                        enterEvent();
                    }
                }}
            />
        </Styles>
    )
}