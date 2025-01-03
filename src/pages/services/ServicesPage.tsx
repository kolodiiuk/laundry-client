import { Divider, Link, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Washing from "./Washing";
import DryCleaning from "./DryCleaning";
import Ironing from "./Ironing";
import { useState } from "react";
import {ServiceCategory} from "../../app/models/Service";

export default function ServicesPage() {
    const [section, setSection] = useState(ServiceCategory.Washing);
    const renderSection = () => {
        switch (section) {
            case ServiceCategory.Washing:
                return <Washing />;
            case ServiceCategory.DryCleaning:
                return <DryCleaning />;
            case ServiceCategory.Ironing:
                return <Ironing />;
            default:
                return <Washing/>
        }
    };
    
    return (
        <Box>
            {/*<Box>*/}
            {/*<Stack*/}
            {/*    sx={{*/}
            {/*        width: {xs: '100%', sm: '96vw'},*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'row',*/}
            {/*        justifyItems: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*        alignContent: 'center',*/}
            {/*        justifyContent: 'space-evenly',*/}

            {/*    }}   */}
            {/*>*/}
            {/*    <Link*/}
            {/*        underline='hover'*/}
            {/*        onClick={() => setSection(ServiceCategory.DryCleaning)}*/}
            {/*    >*/}
            {/*        <Typography>Хімчистка</Typography>*/}
            {/*        */}
            {/*    </Link>*/}
            {/*    <Divider flexItem orientation="vertical" variant='fullWidth'/>*/}
            {/*    <Link*/}
            {/*        underline="hover"*/}
            {/*        onClick={() => setSection(ServiceCategory.Washing)}*/}
            {/*    >*/}
            {/*        <Typography>Прання</Typography>*/}
            {/*    </Link>*/}
            {/*    <Divider flexItem orientation="vertical" variant='fullWidth'/>*/}
            {/*    <Link*/}
            {/*        underline="hover"*/}
            {/*        onClick={() => setSection(ServiceCategory.Ironing)}*/}
            {/*    >*/}
            {/*        <Typography>Прасування</Typography>*/}
            {/*    </Link>*/}
            {/*</Stack>            */}
            {/*</Box>*/}
            <Box mt={'10px'} height={'10vh'}>
                {/*{renderSection()}*/}
                <Washing/>
            </Box>
        </Box>
    )
};
