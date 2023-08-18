import { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import Loading from "../common/Loading";
import "./JobList.css";

const JobList = () => {
    const [jobs, setJobs] = useState(null);
    const [query, setQuery] = useState(null);
    const [inputVal, setInputVal] = useState("")

    useEffect(() => {
        search(query);
    }, [query]);

    const search = async (title) => {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setQuery(inputVal);
        setInputVal("");
    }
    const handleChange = (e) => {
        setInputVal(e.target.value);
    }
    if (!jobs) return <Loading />;

    return (
        <div className="JobList">
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <input className="JobList-search" name="JobList" placeholder="Search jobs..." onChange={handleChange} value={inputVal} />
                </div>
            </form>
            <div className="JobList-library container">
                <div className="my-3">
                    {!query ? (<p><small>All available jobs.</small></p>) : <p><small>Results for "{query}". </small></p>}
                </div>
                {jobs.length
                    ? <JobCardList jobs={jobs} />
                    : <p className="text-center">No results were found.</p>
                }
            </div>
        </div>
    );
}

export default JobList;