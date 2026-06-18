export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidName = (name) => {
    return name.trim().length >= 3;
};

export const isValidPassword = (password) => {
    return password.length >= 6;
};