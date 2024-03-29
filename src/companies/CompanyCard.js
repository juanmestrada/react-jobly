import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ name, description, logoUrl, handle }) => {

  return (
      <Link className="CompanyCard card CC-card" to={`/companies/${handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {name}
            {/* {logoUrl && <img src={logoUrl}
                             alt={name}
                             className="float-right ml-5" />} */}
          </h6>
          <p><small>{description}</small></p>
        </div>
      </Link>
  );
}

export default CompanyCard;