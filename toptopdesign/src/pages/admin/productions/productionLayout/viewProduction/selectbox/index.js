import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: var(--font-family-manrope-medium);
  font-size: var(--font-size-14);
  font-weight: 500;
  height: 48px;
  width: 100%;
  background: var(--white);
  border: none;
  border-radius: 4px;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: var(--charade);
  border: 1px solid #EBEAED;
  &:hover {
    background: var(--background-gray);
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
    font-family: var(--font-family-manrope);
    font-size: var(--font-size-14);
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    width: 100%;
    background: var(--white);
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12));
    border-radius: 4px;
    color: #2E2C34;
    overflow: auto;
    outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;
  margin-bottom: 2px;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} defaultValue={props.defaultValue}/>;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

function renderValue(option) {
  if (option == null) {
    return <span></span>;
  }

  return (
    <span>
      <span style={{color: '#84818A'}}>{option.label}</span>
    </span>
  );
}

export default function SelectBox({setKeyword, year}) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    let tmp = [];
    for(let i = 0; i < 5; i++){
      tmp.push(currentYear - i);
    }
    setYears(tmp);
  }, [])

  return (
    <CustomSelect 
        renderValue={renderValue}
        onChange={(e) => {
            setKeyword(e)
        }}
        defaultValue={year}
    >
      {years.map((item, idx) => {
        return (
          <StyledOption value={item} key={idx}>{item}</StyledOption>
        )
      })}
    </CustomSelect>
  );
}
