const storage = (name = "cine-log") => {
    try {
        const savedData = localStorage.getItem(name);

        return savedData ? JSON.parse(savedData) : null;
    } catch (err) {
        return null;
    }
};

export default storage;
