import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import axios from "axios";

function SearchComponent({ search, setSearch, categories, setActivePart, setCurrentData, activePart }) {
    const [text, setValue] = useState("");
    const [value] = useDebounce(text, 500);

    const onInput = ({ target: { value } }) => {
        setValue(value);
    };
    const triggerSearch = (value) => {
        const url = `http://localhost:8000/${search}`;


        axios
            .post(url, {
                query: value
            })
            .then((res) => {
                setSearch(res.data.msg);
                setCurrentData(res.data.msg);
                console.log(res.data.msg);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // running delay
    useEffect(() => {
        triggerSearch(value);
    }, [value]);

    return (

        <div className="input-group my-5">
            <input
                value={text}
                onChange={onInput}
                type="text" placeholder="Search…"
                className="input input-bordered w-full" />
            <select className="select select-bordered"
                onChange={(e) => {
                    setActivePart(e.target.value);
                }}

                value={
                    activePart ? activePart : "processor"
                }

            >
                {
                    Object.keys(categories).map((category, index) => {
                        return <option key={index}>{category}</option>
                    })
                }
            </select>
            <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
    );
}



function correctWord(string) {
    switch (string) {
        case "ram":
            return "RAM";
        case "processor":
            return "Processor";
        case "motherboard":
            return "Motherboard";
        case "powersupply":
            return "Powersupply";
        case "ssd":
            return "SSD";
        case "gpu":
            return "GPU";
        case "monitor":
            return "MONITOR";
        case "cabinet":
            return "CABINET";
        default:
            return "Processor";
    }
}


function defaultSearch(search) {
    switch (search) {
        case "ram":
            return "corsair";
        case "processor":
            return "ryzen";
        case "motherboard":
            return "b450";
        case "powersupply":
            return "600";
        case "ssd":
            return "evo";
        case "gpu":
            return "ti";
        case "monitor":
            return "acer";
        case "cabinet":
            return "cooler";
        default:
            return "ryzen";
    }
}


export default function Home() {

    const categories = {
        processor: "",
        motherboard: "",
        ram: "",
        powersupply: "",
        ssd: "",
        gpu: "",
        monitor: "",
        cabinet: ""
    }

    const [parts, setParts] = useState(categories);
    const [activePart, setActivePart] = useState("processor");
    const [search, setSearch] = useState("");
    const [currentData, setCurrentData] = useState([]);
    const [activePartID, setActivePartID] = useState({
        processor: 0,
        motherboard: 0,
        ram: 0,
        powersupply: 0,
        ssd: 0,
        gpu: 0,
        monitor: 0,
        cabinet: 0
    });



    return (
        <div>
            <main className='w-full h-full prose lg:prose-lg xl:prose-xl max-w-none text-center my-[50px] justify-center' >
                <div className="flex flex-col justify-center items-center ">

                    <div className='container'>
                        <h1>
                            <span className="text-5xl font-bold">Build Your PC</span>
                        </h1>
                        <div className="form-control w-full">
                            <SearchComponent
                                search={`search${correctWord(activePart)}`}
                                categories={categories}
                                setSearch={setSearch}
                                setActivePart={setActivePart}
                                setCurrentData={setCurrentData}
                                activePart={activePart}
                            />
                        </div>
                        <div className='flex pc_container'>
                            <div className="flex">
                                <div className="btn-group btn-group-vertical child:btn-lg m-5">
                                    {
                                        categories &&
                                        Object.keys(categories).map((category, index) => {

                                            return (
                                                <>
                                                    <button
                                                        key={index}
                                                        className={`btn ${activePart === category ? 'btn-primary' : ''} `}
                                                        onClick={async () => {

                                                            setSearch("");
                                                            setCurrentData([]);

                                                            // make search again

                                                            const response = await axios.post(`http://localhost:8000/search${correctWord(category)}`, {
                                                                query: defaultSearch(category)
                                                            })

                                                            // set the data
                                                            setSearch(response.data.msg);
                                                            setCurrentData(response.data.msg);

                                                            // set the active part
                                                            setActivePart(category);

                                                        }}
                                                    >
                                                        {category}
                                                    </button>

                                                </>
                                            )
                                        })
                                    }
                                    <button className='btn btn-accent'
                                        onClick={() => {

                                            // loop through all selected parts
                                            Object.keys(parts).find((part) => {
                                                if (parts[part] === "") {
                                                    setActivePart(part);
                                                    return true;
                                                }
                                            })

                                            // clear all current data
                                            setCurrentData([]);

                                            // set current data to selected parts
                                            setCurrentData(Object.values(parts));



                                        }}
                                    >
                                        Check Selection
                                    </button>

                                </div>
                            </div>
                            <div className='flex-1'>
                                <div className='flex flex-wrap child:m-2'>
                                    {
                                        currentData && (
                                            currentData.map((item, index) => {
                                                const properties = Object.keys(item);
                                                return <div key={index} className="card">
                                                    <div

                                                        className={`card card-compact w-96 bg-base-100 shadow-xl ${activePartID[activePart] === item.id ? "border-2 border-primary rounded-md" : ""
                                                            } `}

                                                        onClick={(e) => {
                                                            setParts({
                                                                ...parts,
                                                                [activePart]: item
                                                            })

                                                            // set the active part name
                                                            setActivePartID({
                                                                ...activePartID,
                                                                [activePart]: item.id
                                                            })


                                                        }}
                                                    >
                                                        <img
                                                            src={"storage/" + item.imageurl}
                                                            className="w-full h-64 object-cover"
                                                            style={{
                                                                margin: 0
                                                            }}
                                                        />
                                                        <div className="card-body m-0">
                                                            <h2 className="card-title m-0">

                                                                {activePart}:{" "}
                                                                {item.name}
                                                            </h2>
                                                            <div class="overflow-x-auto">
                                                                <table class="table w-full">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Property</th>
                                                                            <th>Value</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            properties.map((property, index) => {
                                                                                return <tr key={index}>
                                                                                    {
                                                                                        (property !== "motherboard" && property !== "imageurl") ? (
                                                                                            <>
                                                                                                <td>{property}</td>
                                                                                                <td>{item[property]}</td>
                                                                                            </>
                                                                                        ) : (<></>)
                                                                                    }
                                                                                </tr>
                                                                            })
                                                                        }
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

        </div >
    )
}
