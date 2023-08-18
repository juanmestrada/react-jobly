import { useContext, useEffect, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

const JobCard = ({ id, title, salary, equity, companyName }) => {

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {

        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    const handleApply = async (e) => {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    const formatSalary = (salary) => {
        const digitsRev = [];
        const salaryStr = salary.toString();
    
        for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
        }
    
        return digitsRev.reverse().join("");
    }

    return (
        <div className="JobCard card CC-card"> {applied}
            <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p>{companyName}</p>
            {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
            {equity !== undefined && <div><small>Equity: {equity}</small></div>}
            <button
                className="btn btn-danger font-weight-bold text-uppercase float-end"
                onClick={handleApply}
                disabled={applied}
            >
                {applied ? "Applied" : "Apply"}
            </button>
            </div>
        </div>
    );
}

export default JobCard;
