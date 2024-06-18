import { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddPackage from '../addPackage/AddPackage';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const AllPackages = (observer(() => {
    const [packagesList, setPackagesList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [collected, setCollected] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [showAddPackage, setShowAddPackage] = useState(false); 
    const [newPackage, setNewPackage] = useState({
        name: "",
        trackingNumber: "",
        collected: true,
        lat: 0,
        lng: 0
    })
    const handleFilter = (event) => {
        const value = event.target.value;
        console.log(value)
        const v = value == "true" ? true : false;
        setPackagesList(packagesList.filter(p => p.collected == v))

    };

    const initPackagesList = async () => {
        console.log("init")
        const response = await fetch("http://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e",
            {
                method: "GET",
            })
        const data = await response.json();

        setPackagesList(data);
    }
    useEffect(() => {
        initPackagesList();
    }, []);
    const deletePackage = async ( trackingNumber) => {
        // const response = await fetch(`http://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e/${i.trackingNumber}`,
        //     {
        //         method: "DELETE",
        //     })
        // console.log(response.status)
        // initPackagesList();
        setPackagesList(packagesList.filter(p => p.trackingNumber !== trackingNumber));
    }

    const editCollectedPackage = async ({ i }) => {
        setNewPackage.name(packagesList[i].name);
        setCollected(!packagesList[i].collected);
        setTrackingNumber(packagesList[i].trackingNumber);
        // newPackage.lat = packagesList[i].lat;
        // newPackage.lng = packagesList[i].lng;

        const response = await fetch(`http://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e/${i.trackingNumber}`, newPackage,
            {
                method: "UPDATE",
            })
        console.log(response.status)
        initPackagesList();
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
   

   
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredPackagesList = searchInput.length > 0 
        ? packagesList.filter((p) => p.name.toLowerCase().includes(searchInput.toLowerCase())):packagesList;
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon type="text"
                                placeholder="Search here"
                                onChange={handleChange}
                                value={searchInput} />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <h1>There are {packagesList.length} packages in the list and {packagesList.filter(x => x.collected == true).length} have been collected</h1>

                </Toolbar>
            </AppBar>
            <Button variant="outlined" onClick={() => setShowAddPackage(true)}>add package</Button>
            {showAddPackage && <AddPackage />}

            <RadioGroup name="use-radio-group" defaultValue="first">
                <FormControlLabel value="true" label="collected" control={<Radio />} onChange={handleFilter} />
                <FormControlLabel value="false" label="not collected" control={<Radio />} onChange={handleFilter} />
            </RadioGroup>
            <div>
                {packagesList.map((_, i) =>
                    <Grid item xs={12} md={6}>
                        <ListItem>
                            <a>{packagesList[i].name}</a>
                        </ListItem>
                        <DeleteIcon onClick={() => deletePackage(packagesList[i].trackingNumber)}></DeleteIcon>
                        <Button onClick={() => editCollectedPackage(i)}>{packagesList[i].collected ? "collected" : "not collected"}</Button>
                   
                    </Grid>
                )}
            </div>
        </>

    )
}))
export default AllPackages