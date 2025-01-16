import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle.tsx";
import {Button, Card, Link, TextField} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function RegisterPage() {
    return (
        <>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.1s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={{
                    width: {xs: '100%', sm: '96vw', md: '98vw'},
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    mb: '400px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    // backdropFilter: 'blur(12px)',
                    // backgroundColor: 'rgba(255 255 255 / 0.2)',
                }
                }
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '97vh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{py: 3, display: 'flex', justifyContent: 'space-between'}}
                    >
                        <Box
                            sx={{
                                gap: 2,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton color="primary" href="/services">
                                <HomeRoundedIcon
                                    color="secondary"
                                />

                            </IconButton>
                        </Box>
                        <ColorSchemeToggle/>
                    </Box>
                    <Card
                        variant='outlined'
                        component="main"
                        sx={{
                            my: 'auto',
                            padding: '30px',
                            py: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: '13px',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack sx={{gap: 4, mb: 2}}>
                            <Stack sx={{gap: 1, display: 'flex', alignItems: 'center'}}>
                                <Typography component="h1" variant={"h5"} sx={{}}>
                                    Sign up
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack sx={{gap: 4, mt: 2}}>
                            <form
                                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        email: formElements.email.value,
                                        password: formElements.password.value,
                                        // persistent: formElements.persistent.checked,
                                    };
                                    alert(JSON.stringify(data, null, 2));
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>First name</FormLabel>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        placeholder="Jon Snow"
                                        //   error={nameError}
                                        //   helperText={nameErrorMessage}
                                        //   color={nameError ? 'error' : 'primary'}
                                    /> </FormControl>
                                <FormControl required>
                                    <FormLabel>Last name</FormLabel>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        placeholder="Jon Snow"
                                        //   error={nameError}
                                        //   helperText={nameErrorMessage}
                                        //   color={nameError ? 'error' : 'primary'}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        // error={emailError}
                                        // helperText={emailErrorMessage}
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        autoFocus
                                        required
                                        fullWidth
                                        variant="outlined"
                                        // color={emailError ? 'error' : 'primary'}
                                        sx={{ariaLabel: 'email'}}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <TextField
                                        // error={passwordError}
                                        // helperText={passwordErrorMessage}
                                        name="password"
                                        placeholder="••••••"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        // color={passwordError ? 'error' : 'primary'}
                                    /> </FormControl>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography component="p" variant="body1">
                                        Already have an account?
                                    </Typography>
                                    <Link href="/login">
                                        Sign in
                                    </Link>
                                </Box>
                                <Stack sx={{gap: 4, mt: 2}}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                    </Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant='outlined'
                                        color='primary'
                                        sx={{borderColor: 'lightgrey'}}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Card>

                </Box>
            </Box>
        </>
    );
}
