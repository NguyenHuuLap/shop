import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function WardPicker({ setWard, ward, districtCode }) {
    const [listWard, setListWard] = React.useState([]);
    const [defaultValue, setDefaultValue] = React.useState(ward ? ward.name : null);

    React.useEffect(() => {
        const fecthData = async () => {
            if (ward && ward.district_code !== districtCode) {
                setWard(null);
                setDefaultValue(null);
            }
            const response = await axios.get("https://provinces.open-api.vn/api/w/");
            setListWard(response.data.filter(i => i.district_code === districtCode));
        }
        fecthData();
    }, [districtCode])

    const handleChange = (option, value) => {
        setWard(listWard.find(i => i.name === value));
        setDefaultValue(value);
    }

    return (
        <Autocomplete
            disablePortal
            options={listWard.map((option) => option.name)}
            size='small'
            sx={{ width: "100%" }}
            value={defaultValue}
            onChange={handleChange}
            noOptionsText="Không tìm thấy Phường/Xã"
            renderInput={(params) => <TextField
                {...params}
                label="Phường/Xã"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
            />}
        />
    );
}