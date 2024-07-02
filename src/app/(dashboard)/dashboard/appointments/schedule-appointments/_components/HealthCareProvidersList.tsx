"use client";
import React, { Dispatch, SetStateAction, Suspense, useState } from "react";
import { getProviders } from "../../_actions/getProviders-actions";
import { useQuery } from "@tanstack/react-query";
import { HasAppointmentSearch } from "./FindAppointments";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HealthCareProvidersListProps {
  appointmentSearch: HasAppointmentSearch;
  setAppointmentSearch: Dispatch<SetStateAction<HasAppointmentSearch>>;
}

const HealthCareProvidersList = ({
  appointmentSearch,
  setAppointmentSearch,
}: HealthCareProvidersListProps) => {
  const { data: healthcareProviders, isFetching: isFetchingHealcareProviders } =
    useQuery({
      queryKey: ["healthcareProviders"],
      queryFn: getProviders,
      staleTime: 60 * 60 * 1000,
    });
  return (
    <>
      <div className="flex flex-col items-center h-[500px]  gap-3 border-2 p-3 rounded-lg border-violet-300 overflow-auto">
        <h1 className="font-bold text-lg">Select a Provider:</h1>
        <ScrollArea className="flex flex-col w-56 gap-2 p-3">
          {healthcareProviders?.map((provider) => (
            <div
              key={provider.id}
              onClick={() =>
                setAppointmentSearch((prevState) => ({
                  ...prevState,
                  providerId: provider.id,
                  providerFirstName: provider.firstName,
                  providerLastName: provider.lastName,
                }))
              }
              className={`w-full h-20 border-2 border-violet-300 rounded-lg cursor-pointer ${
                appointmentSearch.providerId === provider.id && "bg-violet-200"
              }`}
            >
              <h4 className="font-bold text-md lg:text-xl">
                {provider.firstName} {provider.lastName}
              </h4>
              <p className="text-sm lg:text-md">{provider.email}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  );
};

export default HealthCareProvidersList;
