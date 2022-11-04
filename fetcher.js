export const fetchRAM = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchRAM");
    const items = await data.json();
    return items;
};
export const fetchProcessor = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchProcessor");
    const items = await data.json();
    return items;
};
export const fetchMotherboard = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchMotherboard");
    const items = await data.json();
    return items;
};
export const fetchPowersupply = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchPowersupply");
    const items = await data.json();
    return items;
};
export const fetchSSD = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchSSD");
    const items = await data.json();
    return items;
};
export const fetchGPU = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchGPU");
    const items = await data.json();
    return items;
};
export const fetchMONITOR = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchMONITOR");
    const items = await data.json();
    return items;
};
export const fetchCABINETS = async () => {
    const data = await fetch("http://127.0.0.1:8000/fetchCABINET");
    const items = await data.json();
    return items;
};