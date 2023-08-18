import { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import './CompanyList.css';
import CompanyCard from "./CompanyCard";
import Loading from "../common/Loading";

const CompanyList = () => {
    const [companies, setCompanies] = useState(null);
    const [query, setQuery] = useState(null);
    const [inputVal, setInputVal] = useState("");

    useEffect(() => {
        const getCompanies = async (name) =>{
            try {
                let companies = await JoblyApi.getCompanies(name);
                
                setCompanies(companies);
            } catch (error) {
                console.log("error getting companies, ", error)
            }
        }

        getCompanies(query);
    }, [query])

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(inputVal);
        setInputVal("");
    } 
    const handleChange = (e) => {
        setInputVal(e.target.value);
    }
    if (!companies) return <Loading />;
    
    return (
        <div className="CompanyList">
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <input className="CompanyList-search" name="CompanyList" placeholder="Search company..." value={inputVal} onChange={handleChange} />
                </div>
            </form>
            <div className="CompanyList-library container">
                <div className="my-3">
                {!query ? (<p><small>All Companies.</small></p>) : <p><small>Results for "{query}". </small></p>}
                </div>
                {companies.length ? companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  )) : <p className="text-center">No results were found.</p>}
            </div>
        </div>
    )
}

export default CompanyList;