import Input from "@mui/material/Input";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import IconButton from "@mui/material/IconButton";

export function Search() {
    return <>
        <Input
            placeholder="Search anything…"
            sx={{
                alignSelf: "center",
                display: {
                    xs: "none",
                    sm: "flex",
                },
            }}
        />
        <IconButton
            sx={{display: {xs: "inline-flex", sm: "none"}, alignSelf: "center"}}
        >
            <SearchRoundedIcon/>
        </IconButton>
    </>;
}