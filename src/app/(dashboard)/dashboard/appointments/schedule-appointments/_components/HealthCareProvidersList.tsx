"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { getProviders } from "../../_actions/getProviders-actions";
import { useQuery } from "@tanstack/react-query";
import { HasAppointmentSearch } from "./FindAppointments";

interface HealthCareProvidersListProps {
  appointmentSearch: HasAppointmentSearch;
  setAppointmentSearch: Dispatch<SetStateAction<HasAppointmentSearch>>;
}

const HealthCareProvidersList = ({
  appointmentSearch,
  setAppointmentSearch,
}: HealthCareProvidersListProps) => {
  const { data: healthcareProviders } = useQuery({
    queryKey: ["healthcareProviders"],
    queryFn: getProviders,
    staleTime: 60 * 60 * 1000,
  });
  return (
    <>
      <h1 className="font-bold text-lg">Select a Provider:</h1>
      <div className="flex flex-col w-56 h-52 overflow-auto">
        {healthcareProviders?.map((provider) => (
          <div
            key={provider.id}
            onClick={() =>
              setAppointmentSearch((prevState) => ({
                ...prevState,
                providerId: provider.id,
              }))
            }
            className={`w-full h-48 border-2 border-violet-300 rounded-lg cursor-pointer ${
              appointmentSearch.providerId === provider.id && "bg-violet-200"
            }`}
          >
            <h4 className="font-bold">
              {provider.firstName} {provider.lastName}
            </h4>
            <p className="text-sm">{provider.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HealthCareProvidersList;
