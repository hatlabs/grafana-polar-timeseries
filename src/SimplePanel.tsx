import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
//import { css, cx } from 'emotion';
//import { stylesFactory, useTheme } from '@grafana/ui';
import Plot from 'react-plotly.js';

interface Props extends PanelProps<SimpleOptions> { }

  //const theme = useTheme();
  //const styles = getStyles();
export const SimplePanel: React.FC<Props> = ({ options, data, width, height, timeRange }) => {
  
  const plotData: Plotly.Data[] = data.series.map(item => {
    const timeVals: Plotly.Datum[] = item.fields[0].values.toArray();
    const thetaVals: Plotly.Datum[] = item.fields[1].values.toArray();
    const data: Plotly.Data = {
      r: timeVals,
      theta: thetaVals,
      type: 'scatterpolar',
      mode: 'lines+markers',
    };
    return data;
  });

  const plotLayout: Partial<Plotly.Layout> = {
    width: width,
    height: height,
    margin: { l: 30, r: 30, b: 30, t: 30 },
    polar: {
      angularaxis: {
        direction: "clockwise",
        dtick: 15,
      },
      radialaxis: {
        angle: 90,
        tickangle: 90,
        autorange: 'reversed',
        rangemode: 'nonnegative',
        range: [timeRange.from, timeRange.to],
      },
    },
    paper_bgcolor: "black",
  };

  const plotConfig: Partial<Plotly.Config> = {
    displayModeBar: false
  };

  return (
    <Plot
      data={plotData}
      layout={plotLayout}
      config={plotConfig}
    />
    // <div
    //   className={cx(
    //     styles.wrapper,
    //     css`
    //       width: ${width}px;
    //       height: ${height}px;
    //     `
    //   )}
    // >
    //   <svg
    //     className={styles.svg}
    //     width={width}
    //     height={height}
    //     xmlns="http://www.w3.org/2000/svg"
    //     xmlnsXlink="http://www.w3.org/1999/xlink"
    //     viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
    //   >
    //     <g>
    //       <circle style={{ fill: `${theme.isLight ? theme.palette.greenBase : theme.palette.blue95}` }} r={100} />
    //     </g>
    //   </svg>

    //   <div className={styles.textBox}>
    //     {options.showSeriesCount && (
    //       <div
    //         className={css`
    //           font-size: ${theme.typography.size[options.seriesCountSize]};
    //         `}
    //       >
    //         Number of series: {data.series.length}
    //       </div>
    //     )}
    //     <div>Text option value: {options.text}</div>
    //   </div>
    // </div>
  );
};

// const getStyles = stylesFactory(() => {
// return {
// wrapper: css`
// position: relative;
// `,
// svg: css`
// position: absolute;
// top: 0;
// left: 0;
// `,
// textBox: css`
// position: absolute;
// bottom: 0;
// left: 0;
// padding: 10px;
// `,
// };
//});
