import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import Loading from "../common/Loading";
import './CompanyDetail.css';

const CompanyDetail = () => {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      try {
        let {jobs, currcompany} = await JoblyApi.getCompanyWithJobs(handle);

        setCompany({...currcompany[0], jobs});
      } catch (error) {
        console.log(error);
      }
    }

    getCompany();
  }, [handle]);

  if (!company) return <Loading />;

  return (
      <div className="CompanyDetail container">
        <div className="CompanyDetail-info">
          <h4>{company.name}</h4>
          <p className="my-3">{company.description}</p>
          <p>Company size : {company.numEmployees} employees.</p>
        </div>
        <p><small>Job opportunities with {company.name}:</small></p>
        {company.jobs.length ? (<JobCardList jobs={company.jobs} />) : <p className="text-center">There are no open jobs.</p>}
      </div>
  );
}

export default CompanyDetail;