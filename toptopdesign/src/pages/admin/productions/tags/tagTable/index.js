import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import CustomedInput from './input';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tag',
    numeric: false,
    disablePadding: true,
    label: 'Tag Name',
  },
  {
    id: 'count',
    numeric: false,
    disablePadding: false,
    label: '# of images using this tag',
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--white)',
        fontFamily: 'var(--font-family-manrope-semi-bold)',
        fontSize: 'var(--font-size-12)',
        fontWeight: 600,
        color: 'var(--txt-gray)',
        height: 53,
        borderCollapse: 'initial',
    },
    '&': {
        height: 72,
        border: 'none', 
        padding: 0,
        fontFamily: 'var(--font-family-manrope-medium)',
        fontSize: 'var(--font-size-14)',
        fontWeight: 500,
        color: 'var(--charade)',
        borderCollapse: 'initial',
    }
}));

const StyledBoldTableCell = styled(TableCell)(({ theme }) => ({
    '&': {
        fontFamily: 'var(--font-family-manrope-semi-bold)',
        fontSize: 'var(--font-size-14)',
        fontWeight: 600,
        color: 'var(--charade)',
        height: 72,
        border: 'none',
        padding: 0,
        borderCollapse: 'initial',
        position: 'relative',
    },
    '& .user-name': {
        marginLeft: 16,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&': {
      backgroundColor: 'white',
      borderBottom: '1px solid #EBEAED'
    },
    '& > td': {
        height: '72px !important'
    },
}));

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
            {/* <Checkbox 
                sx={{
                    color: 'var(--txt-gray)',
                    '&.Mui-checked': {
                        color: 'var(--txt-gray)',
                    },
                }}
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                    'aria-label': 'select all desserts',
                }}
            /> */}
        </StyledTableCell>
            {headCells.map((headCell) => (
            <StyledTableCell
                key={headCell.id}
                align='left'
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                ) : null}
                </TableSortLabel>
            </StyledTableCell>
            ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TagTable({
    tags, 
    selected, 
    setSelected, 
    isAdding, 
    setAdding,
    addNewTag,
    editTagName,
    editCount
}) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    
    const [newTagName, setNewTagName] = useState('');
    const [newCount, setNewCount] = useState('');
    
    const [clickedTagName, setClickedTagName] = useState(null);
    const [clickedCount, setClickedCount] = useState(null);

    const [clickedItem, setClickedItem] = useState(null);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = tags.map((n) => n.tagName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const enterEventTagName = () => {
        if(newTagName && newCount){
            setAdding(false);
            addNewTag(newTagName, newCount);
            setNewTagName('');
            setNewCount('');
        }
    }

    const enterClickedTagName = (index) => {
        editTagName(index, clickedTagName);
        setClickedItem(null)
    }

    const enterClickedCount = (index) => {
        editCount(index, clickedCount);
        setClickedItem(null)
    }

    const enterEventCount = () => {
        if(newTagName && newCount){
            setAdding(false);
            addNewTag(newTagName, newCount);
            setNewTagName('');
            setNewCount('');
        }
    }

    return (
        <Box sx={{ width: '100%', mt: 4}}>
            <Paper sx={{ width: 'calc(100% - 45px)', height: 689, maxHeight: 689, mb: 4, padding: '24px 21px 15px 24px' }}>
                <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size="small"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={tags.length}
                    />
                    <TableBody>
                        {isAdding &&
                            <StyledTableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                            >
                                <StyledTableCell padding="checkbox">
                                </StyledTableCell>
                                <StyledBoldTableCell
                                    component="td"
                                    id={`enhanced-table-checkbox-a`}
                                    scope="row"
                                    padding="none"
                                >
                                    <CustomedInput
                                        inputValue={newTagName}
                                        inputHandler={setNewTagName}
                                        enterEvent={enterEventTagName}
                                    />
                                </StyledBoldTableCell>
                                <StyledBoldTableCell 
                                    align="left"
                                >
                                    <CustomedInput
                                        inputValue={newCount}
                                        inputHandler={setNewCount}
                                        enterEvent={enterEventCount}
                                    />
                                </StyledBoldTableCell>
                            </StyledTableRow>
                        }
                        {stableSort(tags, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.tagName);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <StyledTableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={index}
                                    selected={isItemSelected}
                                >
                                    <StyledTableCell padding="checkbox">
                                        <Checkbox 
                                            checked={isItemSelected} 
                                            sx={{
                                                color: 'var(--txt-gray)',
                                                '&.Mui-checked': {
                                                    color: 'var(--txt-gray)',
                                                },
                                            }}
                                            onClick={(e) => handleClick(e, row.tagName)}
                                        />
                                    </StyledTableCell>
                                    <StyledBoldTableCell
                                        component="td"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        onDoubleClick={() => {
                                            setClickedItem({row: index, col: 0});
                                        }}
                                    >
                                        {clickedItem && clickedItem?.row === index && clickedItem?.col === 0?
                                            <CustomedInput
                                                inputValue={clickedTagName}
                                                inputHandler={setClickedTagName}
                                                enterEvent={() => enterClickedTagName(index)}
                                            />:
                                            row.tagName
                                        }
                                    </StyledBoldTableCell>
                                    <StyledBoldTableCell 
                                        align="left"
                                        onDoubleClick={() => {
                                            setClickedItem({row: index, col: 1});
                                        }}
                                    >
                                        {clickedItem && clickedItem?.row === index && clickedItem?.col === 1?
                                            <CustomedInput
                                                inputValue={clickedCount}
                                                inputHandler={setClickedCount}
                                                enterEvent={() => enterClickedCount(index)}
                                            />:
                                            row.count
                                        }
                                    </StyledBoldTableCell>
                                </StyledTableRow>
                            );
                            })}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
            <div style={{ display: 'flex', width: '100%'}}>
                <Pagination
                    sx={{ marginLeft: 'auto'}}
                    count={tags.length}
                    shape="rounded" 
                    onChange={handleChangePage}
                />
            </div>
        </Box>
    );
}
