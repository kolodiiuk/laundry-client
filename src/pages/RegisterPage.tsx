import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ColorSchemeToggle from "../components/common/ColorSchemeToggle.tsx";
import {Button, Card, Link, TextField} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch } from "../app/store/configureStore.ts";
import { register } from "../app/store/slices/AuthSlice";

interface FormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phoneNumber: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function RegisterPage() {
    const dispatch = useAppDispatch();

    return (
        <>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.1s',
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
                                onSubmit={(event: React.FormEvent<SignUpFormElement>) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        firstName: formElements.firstName.value,
                                        lastName: formElements.lastName.value,
                                        email: formElements.email.value,
                                        phoneNumber: formElements.phoneNumber.value,
                                        password: formElements.password.value,
                                    };
                                    dispatch(register(data));
                                }}
                            >
                        <FormControl required>
                            <FormLabel>First Name</FormLabel>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                id="firstName"
                                required
                                fullWidth
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Last Name</FormLabel>
                            <TextField
                                autoComplete="family-name"
                                name="lastName"
                                id="lastName"
                                required
                                fullWidth
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder=""
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ariaLabel: 'email'}}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Phone Number</FormLabel>
                            <TextField
                                id="phoneNumber"
                                type="text"
                                name="phoneNumber"
                                placeholder=""
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                name="password"
                                placeholder=""
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                            /> 
                        </FormControl>
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
