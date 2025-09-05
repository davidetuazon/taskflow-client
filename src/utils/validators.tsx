const mustNotBeEmptyOrSpace = (val: string) =>
    val && val.trim() !== '' ? true : 'This field is required';

const mustBeValidEmail = (val: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
        ? true
        : 'The email is invalid';

const mustBeValidProjectName = (val: string) =>
    /^[a-zA-Z0-9._-]+$/.test(val) ?
    true :
    "Project name can only contain ASCII letters, digits, and the characters ., -, and _."   

export {
    mustNotBeEmptyOrSpace,
    mustBeValidEmail,
    mustBeValidProjectName
}