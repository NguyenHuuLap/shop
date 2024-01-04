import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function DistrictPicker({ setDistrict, district, provinceCode }) {
  const [listDistrict, setListDistrict] = React.useState([]);
  const [defaultValue, setDefaultValue] = React.useState(district ? district.name : null);

  React.useEffect(() => {
    const fecthData = async () => {
      if (district && district.province_code !== provinceCode) {
        setDistrict(null);
        setDefaultValue(null);
      }
      const response = await axios.get("https://provinces.open-api.vn/api/d/");
      setListDistrict(response.data.filter(i => i.province_code === provinceCode));
    }
    fecthData();
  }, [provinceCode])

  const handleChange = (option, value) => {
    setDistrict(listDistrict.find(i => i.name === value));
    setDefaultValue(value)
  }

  return (
    <Autocomplete
      disablePortal
      options={listDistrict.map((option) => option.name)}
      size='small'
      sx={{ width: "100%" }}
      onChange={handleChange}
      value={defaultValue}
      noOptionsText="Không tìm thấy Quận/Huyện"
      renderInput={(params) => <TextField
        {...params}
        label="Quận/Huyện"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />}
    />
  );
}