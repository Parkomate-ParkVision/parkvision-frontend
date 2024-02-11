import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import { toast } from "react-toastify";

const IndividualOrganizationPage = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState({});

  useEffect(() => {
    console.log(id);
    fetchOrganization();
  }, [id]);

  const fetchOrganization = async () => {
    const response = await Fetch.get(ApiConfig.organizations + `/${id}/`);
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setOrganization(data);
    } else {
      toast.error("Error fetching organization");
    }
  };

  return (
    <div>
      <h1>{organization.name}</h1>
      <p>{organization.description}</p>
    </div>
  );
};

export default IndividualOrganizationPage;
