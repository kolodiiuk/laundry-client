import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BottomNavBar() {
    return (
        <Stack
            id="tab-bar"
            direction="row"
            spacing={1}
            sx={{
                justifyContent: 'space-around',
                display: {xs: 'none', sm: 'none'},
                zIndex: '999',
                bottom: 0,
                position: 'fixed',
                width: '100dvw',
                py: 2,
                backgroundColor: 'background.body',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Button
                href="/material-ui/getting-started/templates/email/"
                sx={{flexDirection: 'column', '--Button-gap': 0}}
            >
                Email
            </Button>
            <Button
                aria-pressed="true"
                href="/material-ui/getting-started/templates/team/"
                sx={{flexDirection: 'column', '--Button-gap': 0}}
            >
                Team
            </Button>
            <Button
                href="/material-ui/getting-started/templates/files/"
                sx={{flexDirection: 'column', '--Button-gap': 0}}
            >
                Files
            </Button>
        </Stack>
    );
}
