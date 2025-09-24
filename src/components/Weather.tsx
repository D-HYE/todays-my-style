import { useState,useEffect }  from 'react'
import SeoulWeather from '../api/SeoulWeather'
import { Range, getTrackBackground } from "react-range";
import { ContentWrap } from "./StyleComponents";

const STEP = 1;
const MIN = -10;
const MAX = 40;

interface WeatherProps {
  onTempChange: (temp: number) => void;
}

export default function Weather({onTempChange}:WeatherProps) {
    const { temperature, loading, error } = SeoulWeather();
    const [values, setValues] = useState<number[]>([0]);

    useEffect(() => {
      if (temperature !== undefined && !loading && !error) {
        const temp = temperature ?? 0;
        setValues([Math.round(temp)]);
        onTempChange(Math.round(temp));
      }
    }, [temperature, loading, error, onTempChange]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;

    return (
      <ContentWrap>
        <h3>현재 기온</h3>
        <p style={{minWidth:"3rem"}}>{values}&#8451;</p>
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(vals: number[]) => {
            setValues(vals);
            onTempChange(vals[0]);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{...props.style, height: "2rem", display: "flex", flex:'1'}}
            >
              <div
                ref={props.ref}
                style={{
                  height: "0.5rem",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["var(--d-or)", "var(--d-gr2)"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({props}) => (
            <div
              {...props}
              style={{...props.style, height: "1rem", width: "1rem",
                backgroundColor: "var(--d-wh)", border: "2px solid var(--d-or)", borderRadius: "50%",
                outline:"none"
              }}
            >
            </div>
          )}
        />

      </ContentWrap>
    )
}
