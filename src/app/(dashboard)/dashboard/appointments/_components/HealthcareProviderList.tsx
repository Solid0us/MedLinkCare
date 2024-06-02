import { Card, CardHeader } from "@/components/ui/card";
import { Users } from "@/interfaces/db_interfaces";

const getHealthCareProviders = async () => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/users?role=healthcareProvider`
  );
  const data: Users[] = (await res.json()).data;
  return data;
};

const HealthcareProviderList = async () => {
  const healthcareProviders = await getHealthCareProviders();
  return (
    <>
      {healthcareProviders.map((provider) => {
        return (
          <Card className="w-52">
            <CardHeader>
              {provider.firstName} {provider.lastName}
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
};

export default HealthcareProviderList;
