import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';
import ProvincePicker from '../../../components/common/components/ProvincePicker';
import DistrictPicker from '../../../components/common/components/DistrictPicker';
import WardPicker from '../../../components/common/components/WardPicker';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ReciveTab({ setIsReciveAtStore, setAddress, setNote }) {
    const [value, setValue] = React.useState(0);
    const [province, setProvince] = React.useState(null);
    const [district, setDistrict] = React.useState(null);
    const [ward, setWard] = React.useState(null);
    const [street, setStreet] = React.useState(null);

    React.useEffect(() => {
        setIsReciveAtStore(true);
    }, [])

    React.useEffect(() => {
        const changeAddress = () => {
            const address = {
                "province": province?.name,
                "district": district?.name,
                "ward": ward?.name,
                "street": street,
            }
            setAddress(address);
        }
        changeAddress();
    }, [province, district, ward, street])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setIsReciveAtStore(!newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Nhận tại cửa hàng" {...a11yProps(0)} />
                    <Tab label="Giao hàng tận nơi" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <TextField size="small" label="Ghi chú " variant="outlined" sx={{ width: "100%", my: 0.5 }} onChange={(event) => setNote(event.target.value)} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <ProvincePicker setProvince={setProvince} province={province} />
                    </Grid>
                    <Grid item xs={6}>
                        <DistrictPicker setDistrict={setDistrict} district={district} provinceCode={province ? province.code : null} />
                    </Grid>
                    <Grid item xs={6}>
                        <WardPicker setWard={setWard} ward={ward} districtCode={district ? district.code : null} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField size="small" label="Địa chỉ nhà" variant="outlined" sx={{ width: "100%" }} onChange={(event) => setStreet(event.target.value)} />
                    </Grid>
                </Grid>
                <TextField size="small" label="Ghi chú " variant="outlined" sx={{ width: "100%", my: 1 }} onChange={(event) => setNote(event.target.value)} />

            </CustomTabPanel>

        </Box>
    );
}
