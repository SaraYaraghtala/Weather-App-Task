import { IFetchWeatherDataFunction } from "@/types/api/api.types";

export const fetchWeatherData: IFetchWeatherDataFunction = async (
  city: string | undefined
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_OWM_API}?q=${city}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`
  );

  const data = await response.json();
  console.log(data);
  return data;
};

