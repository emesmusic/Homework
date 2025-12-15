import { WMO_TO_ICON_MAP, ICON_BASE_URL } from './weatherCodeMap';

export default function WeatherDisplay(props) {

    const { temperature, unit, weatherCode } = props;
    const iconURl = `${WMO_TO_ICON_MAP[weatherCode] ? ICON_BASE_URL + WMO_TO_ICON_MAP[weatherCode] + 'd@2x.png' : ICON_BASE_URL + WMO_TO_ICON_MAP[999] + '@2x.png'}`;



    return (
        <>
            <div>

                <img src={iconURl} alt="" />
                <h5>Temperature: {temperature} {unit}</h5>
            </div>



        </>
    )
}