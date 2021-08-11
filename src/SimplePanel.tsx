import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import Plot from 'react-plotly.js';

interface Props extends PanelProps<SimpleOptions> { }

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
  );
};
