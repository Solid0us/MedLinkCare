"use client";
import React, { useState } from "react";
import { getProviders } from "../../_actions/getProviders-actions";
import { useQuery } from "@tanstack/react-query";

const HealthCareProvidersList = () => {
  const { data: healthcareProviders } = useQuery({
    queryKey: ["healthcareProviders"],
    queryFn: getProviders,
    staleTime: 60 * 1000,
  });
  return (
    <>
      <ul>
        {healthcareProviders?.map((provider) => (
          <li>
            {provider.firstName} {provider.lastName}
          </li>
        ))}
      </ul>
    </>
  );
};

export default HealthCareProvidersList;
