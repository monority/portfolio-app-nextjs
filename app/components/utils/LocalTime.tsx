"use client";

import { useEffect, useMemo, useState } from "react";

interface LocalTimeProps {
    className?: string;
    label?: string;
}

type CityStatus = "idle" | "loading" | "success" | "error";

function formatLocalTime(date: Date) {
    return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}

export default function LocalTime({
    className = "",
}: LocalTimeProps) {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [city, setCity] = useState("");
    const [cityStatus, setCityStatus] = useState<CityStatus>("idle");

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setCityStatus("error");
            return;
        }

        let cancelled = false;

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    setCityStatus("loading");

                    const params = new URLSearchParams({
                        format: "jsonv2",
                        lat: String(coords.latitude),
                        lon: String(coords.longitude),
                        zoom: "10",
                        addressdetails: "1",
                    });

                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
                        headers: {
                            Accept: "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to resolve city");
                    }

                    const data = await response.json();
                    const resolvedCity =
                        data.address?.city ||
                        data.address?.town ||
                        data.address?.village ||
                        data.address?.municipality ||
                        data.address?.county;

                    if (!cancelled) {
                        if (resolvedCity) {
                            setCity(resolvedCity);
                            setCityStatus("success");
                        } else {
                            setCityStatus("error");
                        }
                    }
                } catch {
                    if (!cancelled) {
                        setCityStatus("error");
                    }
                }
            },
            () => {
                if (!cancelled) {
                    setCityStatus("error");
                }
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000,
            }
        );

        return () => {
            cancelled = true;
        };
    }, []);

    const localTime = useMemo(() => formatLocalTime(currentDate), [currentDate]);
    const cityLabel = useMemo(() => {
        if (cityStatus === "loading" || cityStatus === "idle") {
            return "Recherche de la ville...";
        }

        if (cityStatus === "error") {
            return "Ville indisponible";
        }

        return city;
    }, [city, cityStatus]);

    return (
        <div className={["local-time", className].filter(Boolean).join(" ")}>
            <div className="local-time__body">
                <div className="local-time__content">
                    <strong className="local-time__value">{localTime}</strong>
                    <span className="local-time__meta">{cityLabel}</span>
                </div>
            </div>
        </div>
    );
}
