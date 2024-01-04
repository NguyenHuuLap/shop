import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function ProvincePicker({setProvince, province}) {
    const [listProvince, setListProvince] = React.useState([]);

    React.useEffect(() => {
        const fecthData = async () => {
            const response = await axios.get("https://provinces.open-api.vn/api/p/");
            setListProvince(response.data);
        }
        fecthData();
    }, [])

    const handleChange = (option, value) => {
        setProvince(listProvince.find(i => i.name===value));
    }

    return (
        <Autocomplete
            disablePortal
            options={listProvince.map((option) => option.name)}
            size='small'
            sx={{ width: "100%" }}
            onChange={handleChange}
            defaultValue={province && province.name}
            renderInput={(params) => <TextField
                {...params}
                label="Tỉnh/Thành phố"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
            />}
        />
    );
}