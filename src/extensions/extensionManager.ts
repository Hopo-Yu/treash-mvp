const registeredExtensions = [];

export const registerExtension = (extension) => {
    registeredExtensions.push(extension);
    // Initialize extension's database if needed
    if (extension.initializeDB) {
        extension.initializeDB();
    }
    // Any other initialization steps
};