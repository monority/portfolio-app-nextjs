import { useEffect, useState } from 'react'

interface WeatherData {
    temperature: number
    icon: string
    label: string
}

interface WeatherProps {
    city?: string
    className?: string
}

type WeatherStatus = 'loading' | 'success' | 'error'

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export default function Weather({
    city = 'Lille',
    className = '',
}: WeatherProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [status, setStatus] = useState<WeatherStatus>('loading')

    useEffect(() => {
        const controller = new AbortController()

        async function loadWeather() {
            try {
                setStatus('loading')

                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`,
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch weather')
                }

                const data = await response.json()

                setWeather({
                    temperature: Math.round(data.current.temp_c),
                    icon: `https:${data.current.condition.icon}`,
                    label: data.current.condition.text,
                })

                setStatus('success')
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    setStatus('error')
                }
            }
        }

        loadWeather()

        return () => controller.abort()
    }, [city])

    if (status === 'error') {
        return null
    }

    return (
        <div className={`weather ${className}`.trim()}>
            {weather ? (
                <>
                    <img
                        className="weather__icon"
                        src={weather.icon}
                        alt={weather.label}
                        width="40"
                        height="40"
                        loading="eager"
                        decoding="async"
                    />
                    <span className="weather__temp">{weather.temperature}°C</span>
                </>
            ) : (
                <>
                    <span className="weather__skeleton weather__skeleton--icon" aria-hidden="true" />
                    <span className="weather__skeleton weather__skeleton--text" aria-hidden="true" />
                </>
            )}
        </div>
    )
}