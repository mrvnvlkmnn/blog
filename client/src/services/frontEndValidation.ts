

const validate = (credentials: {username: string, password: string, repeatPassword?: string, email?: string}) : boolean  => {
    const { username, password, repeatPassword, email } = credentials;

    return (repeatPassword ? validatePassword(password, repeatPassword) : true) && (email ? validateEmail(email) : true);
}

const validatePassword = (password: string, repeatPassword: string) : boolean => {
    if (password.length < 5) return false;
    if (!Object.is(password, repeatPassword)) return false;

    return true;
}

const validateEmail = (email: string) : boolean => {
    if (email.length < 5) return false;
    if (email.indexOf("@") !== 1) return false;

    return true;
}

export default validate;